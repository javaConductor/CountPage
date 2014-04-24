package com.soulsys.gserv.testapps.countpage

import com.soulsys.g_serv.GServ
import com.soulsys.g_serv.plugins.PluginMgr
import com.soulsys.g_serv.plugins.compression.CompressionPlugin
import com.soulsys.g_serv.plugins.cors.CorsPlugin

class Main{

    static void main(String[] args){
        def pluginMgr = PluginMgr.instance()
        //pluginMgr.register("cors", CorsPlugin.class)
        pluginMgr.register("compression", CompressionPlugin.class)
        def gserv = new GServ()

        //// we need CORS plugin here
        gserv.plugins {
            plugin("compression", [:])
        }.http{
            useResourceDocs(true)
            get ("/", file("text/html", "views/index.html"))

        }.start(9092)

    }

}