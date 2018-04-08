package com.diyiliu.gw.netty.handler.codec;

import com.diyiliu.plugin.util.CommonUtil;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * Description: BDDecoder
 * Author: DIYILIU
 * Update: 2018-04-03 15:43
 */

@Slf4j
public class BDDecoder extends ByteToMessageDecoder {

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) {
        String host = ctx.channel().remoteAddress().toString().trim().replaceFirst("/", "");

        if (in.readableBytes() < 4) {

            return;
        }
        in.markReaderIndex();

        int head1 = in.readUnsignedByte();
        int head2 = in.readUnsignedByte();

        // 校验头
        if (head1 != head2 || head1 != 0x24) {

            log.error("校验头[{}]错误!", String.format("%x", head1));
            ctx.close();
            return;
        }

        int length = in.readUnsignedShort();

        if (in.readableBytes() < length - 4) {

            in.resetReaderIndex();
            return;
        }

        // 报文类型
        int cmd = in.readUnsignedByte();

        in.resetReaderIndex();

        // 消息体
        byte[] bytes = new byte[length];
        in.readBytes(bytes);

        out.add(Unpooled.copiedBuffer(bytes));

        log.info("[{}]上行消息[{}]", host, CommonUtil.bytesToStr(bytes));
        // 回复消息
        toResp(ctx, cmd);
    }


    /**
     * 回复消息
     *
     * @param ctx
     * @param cmd
     */
    public void toResp(ChannelHandlerContext ctx, int cmd) {
        ByteBuf buf = Unpooled.buffer(7);
        buf.writeByte(0x24);
        buf.writeByte(0x24);
        buf.writeShort(0x07);
        buf.writeByte(cmd);
        buf.writeByte(0x01);

        byte[] bytes = new byte[6];
        buf.getBytes(0, bytes);

        byte check = CommonUtil.getCheck(bytes);
        buf.writeByte(check);

        ctx.writeAndFlush(buf);
    }
}
