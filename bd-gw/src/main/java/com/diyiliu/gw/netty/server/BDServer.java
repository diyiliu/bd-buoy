package com.diyiliu.gw.netty.server;

import com.diyiliu.gw.netty.handler.BDHandler;
import com.diyiliu.gw.netty.handler.codec.BDDecoder;
import com.diyiliu.gw.netty.handler.codec.BDEncoder;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.timeout.IdleStateHandler;
import lombok.extern.slf4j.Slf4j;

/**
 * Description: BDServer
 * Author: DIYILIU
 * Update: 2018-04-03 16:02
 */

@Slf4j
public class BDServer extends Thread {
    private int port;

    public void init() {

        this.start();
    }

    @Override
    public void run() {
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 1000)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) {
                            ch.pipeline().addLast(new IdleStateHandler(60, 0, 0))
                                    .addLast(new BDEncoder())
                                    .addLast(new BDDecoder())
                                    .addLast(new BDHandler());
                        }
                    });

            ChannelFuture f = b.bind(port).sync();

            log.info("北斗网关启动, 端口[{}]...", port);
            f.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            bossGroup.shutdownGracefully();
            workGroup.shutdownGracefully();
        }
    }

    public void setPort(int port) {
        this.port = port;
    }
}
