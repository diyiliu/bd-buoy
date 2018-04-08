package com.diyiliu.gw.netty.handler.codec;

import com.diyiliu.plugin.util.CommonUtil;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import lombok.extern.slf4j.Slf4j;

/**
 * Description: BDEncoder
 * Author: DIYILIU
 * Update: 2018-04-03 15:43
 */

@Slf4j
public class BDEncoder extends MessageToByteEncoder {

    @Override
    protected void encode(ChannelHandlerContext ctx, Object msg, ByteBuf out) {
        String host = ctx.channel().remoteAddress().toString().trim().replaceFirst("/", "");

        if (msg == null) {

            return;
        }
        ByteBuf buf = (ByteBuf) msg;

        byte[] bytes = new byte[buf.readableBytes()];
        buf.readBytes(bytes);

        log.debug("[{}]下行消息[{}]", host, CommonUtil.bytesToStr(bytes));
        out.writeBytes(bytes);
    }
}
