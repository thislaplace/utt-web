--[[
LuCI - Lua Configuration Interface

Copyright 2008 Steven Barth <steven@midlink.org>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

$Id$
]]--
require "APCommon"
require "APState"
require "luci.http"
module("luci.controller.admin.index", package.seeall)
local http = require("luci.http")



--
-- 自定义函数
--
local SF = string.format
local OE = os.execute
local SS = string.sub

function uci_get_wireless(ifName, name)
    return SS(exec("uci get wireless." .. ifName .. "." .. name), 1, -2)
end


function uci_set_wireless(name, value, ifName)
    os.execute("uci set wireless." .. ifName .. "." .. name .. "=" .. value .. ">/dev/null 2>&1")	
end


function index()
    local root = node()
    if not root.target then
        root.target = alias("admin")
        root.index = true
    end

    local page   = node("admin")
    page.target  = firstchild()
    page.title   = _("Administration")
    page.order   = 10
    page.sysauth = {"admin","root"}
    page.sysauth_authenticator = "htmlauth"
    page.ucidata = true
    page.index = true

    entry({"admin", "logout"}, call("action_logout"), _("Logout"), 90)
    entry({"admin", "allConfig_fastConfigPop"}, call("allConfig_fastConfigPop"), _(""), 90)
    entry({"admin", "adminConfig"}, call("adminConfig"), _(""), 90)
    entry({"admin", "lang"}, call("lang"), _(""), 90)
    entry({"admin", "WirelessInterface"}, call("WirelessInterface"), _(""), 90)
    entry({"admin", "newSsid"}, call("add_new_wifi"), _(""), 90)
    entry({"admin", "rfConfig"}, call("get_rf_info"), _(""), 90)
    entry({"admin", "wireless_rfconfig"}, call("set_rf_info"), _(""), 90)
    entry({"admin", "lan_wirelessInterface"}, call("get_lan_info"), _(""), 90)
    entry({"admin", "set_lan_config"}, call("set_lan_config"), _(""), 90)
    entry({"admin", "fastConfigPop"}, call("fastConfigPop"), _(""), 90)
    entry({"admin", "fastConfigNet"}, call("fastConfigNet"), _(""), 90)
    entry({"admin", "setFastConfPop"}, call("setfastConfigPop"), _(""), 90)
    entry({"admin", "system_state"}, call("system_state"), _(""), 90)
    entry({"admin", "clockManage"}, call("clockManage"), _(""), 90)
    entry({"admin", "set_ntp_config"}, call("set_ntp_config"), _(""), 90)
    entry({"admin", "update"}, call("update"), _(""), 90)
    entry({"admin", "UpdateFirmware"}, call("UpdateFirmware"), _(""), 90)
end



function action_logout()
    local dsp = require "luci.dispatcher"
    local sauth = require "luci.sauth"
    if dsp.context.authsession then
        sauth.kill(dsp.context.authsession)
        dsp.context.urltoken.stok = nil
    end

    luci.http.header("Set-Cookie", "sysauth=; path=" .. dsp.build_url())
    luci.http.redirect(luci.dispatcher.build_url())
end


function allConfig_fastConfigPop()
    local str = 'var configWizard= 1;var systemState= 1;var warningStatistics= 0;var trafficWatcher= 1;var websiteLog= 0;var auditLog= 0;var systemMode= 0;var WANConfig= 1;var LanConfig= 1;var DHCPServer= 1;var portMapping= 1;var routerConfig= 1;var PolicyRoute = 1;var DDNS= 1;var exchangeConfig= 0;var MACFilter= 0;var organizeMember= 1;var userState= 1;var userAuth= 1;var blackList= 1;var behaviorManage= 1;var domainFilter= 1;var whiteList= 1;var electroReport= 1;var behaviorAudit= 0;var appPriority= 1;var trafficManage= 1;var visitControl= 1;var connectControl= 1;var attackProection= 1;var IPSec= 1;var PPTPL2TP= 1;var OpenVPN= 0;var timePlan= 1;var networkServer= 0;var addrGroup= 1;var pageDIY= 0;var domainBase= 0;var networkManageStrategy= 1;var clockManage= 1;var systemMaintenance= 1;var serverMgmt= 0;var deviceReboot= 1;var configMgmt= 1;var sysUpdate= 1;var productLicense= 0;var networkTools= 1;var systemLog= 1;var taskPlan= 1;var defwancount = 1;var dst = 0;var wireless = 1;var wireless_5g = 1;var custom_brand = 0;var mac_limit_menu = 0;var openvpn = 0;var Packet = 1;var WEBAUTH_ADVANCE = 0;var WEBAUTH_ACCOUNT = 1;var snmpConf = 0;var apLog = 0;var apLoadBalance = 0;var SysLogInfo = 1; var MacFilter = 1; var IW_MMoney = 0; var levelone_ctrl = 0; var LEVELONE_LOGO = 0; var galaxywind_ctrl = 0; var uttSmartUi = 0;var Game_Boost =1;var WlanBaseAdvance_new = 1;var WlanBaseAdvance_5g = 0;var WlanSecurity_new = 1;var WlanSecurity = 0;var WlsConf_5g = 1;var WlanBaseAdvance_5g_new = 1;var WlanBaseAdvance_5g = 0;var WlanBase_5g = 0;var WlanSecurity_5g_new = 1;var WlanSecurity_5g = 0;var WlanMacFilter_5g = 1;var WlanAdvanced_5g = 1;var WlanMultiSsid_5g = 1;var WlanHostInfo_5g = 1;var NetShareManage = 1;var FtpServer = 1;var ShareAccountList = 1;var smartWlanRepeater = 0;var smartCloudShare = 0;var smartSecutityConf = 0;var diagTest = 1;var hotel = 1;var ADfilter = 0;var SOFT_UDTYPE = 0;var ADFILTER_UDTYPE = 0;var auto_update = 0; var fitApMacFilter = 0; var vlanConfig = 1; var vpnProxy = 0; var accessCtrl = 1; var weChatManage = 0; var ssidSeparateCtr=0; var DhcpServer = 0; var DhcpServerForAc = 0; var dnsmasq = 0; var DnsRedirect = 1; var dnsmasqPool = 1; var uttKnowifi=0; var utt_5g_channel_149_to_165=0; var PPTPClientList=1; var L2TPList=1; var netSniper=0; var wifiBasicConfig=1; var RFconfig=1; var WDSconfig=1; var MACFilter=1; var HostFilter=1; var PortVlan=0; var lang = \'zhcn\';isMacChange = 1;status = 1;var langArr=Array(); langArr[0]=\'en\'; langArr[1]=\'zhcn\'; var notPopUps=\'0\';'
    http.write_json(str)
end

function adminConfig()
    local str = 'var UserNames=new Array();var UserPass=new Array();var role=new Array();var prompt= "0";var flag= "0";UserNames[0] = "admin";UserPass[0] = "admin";role[0] = "adm";var maxNum=5;var errorstr="";'
    http.write_json(str)
end


function lang()
    local str = 'var lang = \'zhcn\';isMacChange = 1;status = 1;var langArr=Array(); langArr[0]=\'en\'; langArr[1]=\'zhcn\';'
    http.write_json(str)
end


function WirelessInterface()	
    local str = 'var wIndex_24 = []; var wIndex_5 = []; var ssid = []; var sta_rate_policy = []; var sta_rate_up = []; var sta_rate_down = []; var isolate = []; var encode = [];'
    str = str .. 'var hidde = [];var encryption = []; var key = []; var key1 = []; var key2 = []; var key3 = []; var key4 = []; var radio_type = [];'

    local ssid2_num = tonumber(exec("iwconfig | grep \"ath0\" | grep ESSID | wc -l"))
    local ssid5_num = tonumber(exec("iwconfig | grep \"ath1\" | grep ESSID | wc -l"))

    str = str .. SF("var SSID2NUM=%d;", ssid2_num)
    str = str .. SF("var SSID5NUM=%d;", ssid5_num)

    if RF24INFO == 1 and RF5INFO ~= 1 then
        str = str .. "var radioSupport='2';"
    elseif RF24INFO ~= 1 and RF5INFO == 1 then
        str = str .. "var radioSupport='5';"
    elseif RF24INFO == 1 and RF5INFO == 1 then
        str = str .. "var radioSupport='2255';"
    end

    if ssid2_num > 0 then
        for i=0, ssid2_num-1 do
            local interface = "24g" .. i
            str = str .. SF("radio_type[%d] = \"%s\";",      i, uci_get_wireless(interface, "radio_type"))
            str = str .. SF("wIndex_24[%d] = \"%s\";",       i, uci_get_wireless(interface, "wIndex_24"))
            str = str .. SF("wIndex_5[%d] = \"%s\";",        i, uci_get_wireless(interface, "wIndex_5"))
            str = str .. SF("ssid[%d] = \"%s\";",            i, uci_get_wireless(interface, "ssid"))
            str = str .. SF("sta_rate_policy[%d] = \"%s\";", i, uci_get_wireless(interface, "sta_rate_policy"))
            str = str .. SF("sta_rate_down[%d] = \"%s\";",   i, uci_get_wireless(interface, "sta_rate_down"))
            str = str .. SF("sta_rate_up[%d] = \"%s\";",     i, uci_get_wireless(interface, "sta_rate_up"))
            str = str .. SF("isolate[%d] = \"%s\";",         i, uci_get_wireless(interface, "isolate"))
            str = str .. SF("encode[%d] = \"%s\";",          i, uci_get_wireless(interface, "encode"))
            str = str .. SF("hidde[%d] = \"%s\";",           i, uci_get_wireless(interface, "hidden"))
            str = str .. SF("encryption[%d] = \"%s\";",      i, uci_get_wireless(interface, "encryption"))
            str = str .. SF("key[%d] = \"%s\";",             i, uci_get_wireless(interface, "key"))
            str = str .. SF("key1[%d] = \"%s\";",            i, uci_get_wireless(interface, "key1"))
            str = str .. SF("key2[%d] = \"%s\";",            i, uci_get_wireless(interface, "key2"))
            str = str .. SF("key3[%d] = \"%s\";",            i, uci_get_wireless(interface, "key3"))
            str = str .. SF("key4[%d] = \"%s\";",            i, uci_get_wireless(interface, "key4"))
        end
    end

    local index = ssid2_num
    if ssid5_num > 0 then
        for i=0, ssid5_num-1 do

            local flag       = 0
            local interface  = "5g" .. i
            local ssid       = uci_get_wireless(interface, "ssid")
            local radio_type = uci_get_wireless(interface, "radio_type");

            --这个ssid是2.4G和5G公有的，上面2.4G的数组已经包含此ssid，这里就不用再次存入数组中
            if radio_type == "245g" then
                for k=0, ssid2_num-1 do
                    if(ssid == uci_get_wireless("24g"..k, "ssid") and uci_get_wireless("24g"..k, "radio_type") == radio_type) then 
                        flag = 1 
                        break 
                    end
                end	
            end

            if flag ~= 1 then 
                str = str .. SF("radio_type[%d] = \"%s\";",      index, radio_type)
                str = str .. SF("ssid[%d] = \"%s\";",            index, ssid)
                str = str .. SF("wIndex_24[%d] = \"%s\";",       index, uci_get_wireless(interface, "wIndex_24"))
                str = str .. SF("wIndex_5[%d] = \"%s\";",        index, uci_get_wireless(interface, "wIndex_5"))
                str = str .. SF("sta_rate_policy[%d] = \"%s\";", index, uci_get_wireless(interface, "sta_rate_policy"))
                str = str .. SF("sta_rate_down[%d] = \"%s\";",   index, uci_get_wireless(interface, "sta_rate_down"))
                str = str .. SF("sta_rate_up[%d] = \"%s\";",     index, uci_get_wireless(interface, "sta_rate_up"))
                str = str .. SF("isolate[%d] = \"%s\";",         index, uci_get_wireless(interface, "isolate"))
                str = str .. SF("encode[%d] = \"%s\";",          index, uci_get_wireless(interface, "encode"))
                str = str .. SF("hidde[%d] = \"%s\";",           index, uci_get_wireless(interface, "hidden"))
                str = str .. SF("encryption[%d] = \"%s\";",      index, uci_get_wireless(interface, "encryption"))
                str = str .. SF("key[%d] = \"%s\";",             index, uci_get_wireless(interface, "key"))
                str = str .. SF("key1[%d] = \"%s\";",            index, uci_get_wireless(interface, "key1"))
                str = str .. SF("key2[%d] = \"%s\";",            index, uci_get_wireless(interface, "key2"))
                str = str .. SF("key3[%d] = \"%s\";",            index, uci_get_wireless(interface, "key3"))
                str = str .. SF("key4[%d] = \"%s\";",            index, uci_get_wireless(interface, "key4"))
                index = index + 1
            end
        end
    end

    http.write_json(str)	
end


function add_new_wifi()
    -- result:返回值； interface:配置文件对应的接口，比如24g0。
    local result, interface
    local param = {}
    param.radio_type        = http.formvalue("radio_type")
    param.ssid              = http.formvalue("ssid")
    param.encode            = http.formvalue("encode")
    param.isolate           = http.formvalue("isolate")
    param.hidden            = http.formvalue("hidde")
    param.sta_rate_policy   = http.formvalue("sta_rate_policy")
    param.sta_rate_up       = http.formvalue("sta_rate_up")
    param.sta_rate_down     = http.formvalue("sta_rate_down")
    param.wIndex_24         = http.formvalue("wIndex_24")
    param.wIndex_5          = http.formvalue("wIndex_5")
    local encryption        = http.formvalue("encryption")
    OE("echo \"" .. encryption .. "\" >/yuhao")
    if (encryption == "psk") then
        param.encryption = "psk" .. encryption .. "+" .. http.formvalue("psk_algorithm")
        param.key        = http.formvalue("psk_psswd")
    elseif (encryption == "wep") then
        param.encryption      = "wep"
        param.key             = http.formvalue("keynum")
        param.key1            = http.formvalue("key1")
        param.key2            = http.formvalue("key2")
        param.key3            = http.formvalue("key3")
        param.key4            = http.formvalue("key4")
        if(#param.key1 == 5 or #param.key1 == 13) then
            param.key1 = "s:" .. param.key1
        end
        if(#param.key2 == 5 or #param.key2 == 13) then
            param.key2 = "s:" .. param.key2
        end
        if(#param.key3 == 5 or #param.key3 == 13) then
            param.key3 = "s:" .. param.key3
        end
        if(#param.key4 == 5 or #param.key4 == 13) then
            param.key4 = "s:" .. param.key4
        end	
    else
        param.encryption      = "none"
    end


    --根据radio_type判断这个ssid对应的射频类型，并分别保存到配置文件中
    if string.find(param.radio_type, "24") then
        interface = "24g" .. param.wIndex_24
        for k, v in pairs(param) do
            uci_set_wireless(k, v, interface)
        end
        uci_set_wireless("disabled", 0, interface)
    end

    if string.find(param.radio_type, "5") then
        interface = "5g" .. param.wIndex_5
        for k, v in pairs(param) do
            uci_set_wireless(k, v, interface)
        end
        uci_set_wireless("disabled", 0, interface)
    end

    OE("uci commit wireless >/dev/null 2>&1")
    OE("wifi >/dev/null 2>&1")

    local str = "var status = \"1\"; var errorstr = \"\";"
    http.write_json(str)
end


function get_rf_info()
    local str = ""
    str = str .. SF("var WrlessEnables = \"%s\";", uci_get_wireless("wifi0", "disabled"))
    str = str .. SF("var channels = \"%s\";",      uci_get_wireless("wifi0", "channel"))
    str = str .. SF("var chanWidths = \"%s\";",    uci_get_wireless("wifi0", "chanWidths"))
    str = str .. SF("var wmm = \"%s\";",           uci_get_wireless("wifi0", "wmm"))
    str = str .. SF("var shpreambles = \"%s\";",   uci_get_wireless("wifi0", "shpreamble"))
    str = str .. SF("var dtim_period = \"%s\";",   uci_get_wireless("wifi0", "dtim_period"))
    str = str .. SF("var rts = \"%s\";",           uci_get_wireless("wifi0", "rts"))
    str = str .. SF("var frag = \"%s\";",          uci_get_wireless("wifi0", "frag"))
    str = str .. SF("var beacons = \"%s\";",       uci_get_wireless("wifi0", "bintval"))

    str = str .. SF("var WrlessEnables_5 = \"%s\";", uci_get_wireless("wifi1", "disabled"))
    str = str .. SF("var channels_5 = \"%s\";",      uci_get_wireless("wifi1", "channel"))
    str = str .. SF("var chanWidths_5 = \"%s\";",    uci_get_wireless("wifi1", "chanWidths"))
    str = str .. SF("var wmm_5 = \"%s\";",           uci_get_wireless("wifi1", "wmm"))
    str = str .. SF("var shpreambles_5 = \"%s\";",   uci_get_wireless("wifi1", "shpreamble"))
    str = str .. SF("var dtim_period_5 = \"%s\";",   uci_get_wireless("wifi1", "dtim_period"))
    str = str .. SF("var rts_5 = \"%s\";",           uci_get_wireless("wifi1", "rts"))
    str = str .. SF("var frag_5 = \"%s\";",          uci_get_wireless("wifi1", "frag"))
    str = str .. SF("var beacons_5 = \"%s\";",       uci_get_wireless("wifi1", "bintval"))

    http.write_json(str)
end

function set_rf_info()
    local info 	 = {}
    local info_5 = {}
    info.disabled 	 = http.formvalue("WrlessEnable")
    info.hwmode   	 = http.formvalue("WrlessMode")
    info.channel  	 = http.formvalue("channel")
    info.htmode   	 = http.formvalue("chanWidth")
    info.txpower  	 = http.formvalue("power")
    info.rts      	 = http.formvalue("rts")
    info.frag     	 = http.formvalue("frag")
    info.bintval  	 = http.formvalue("beacon")
    info.dtim_period = http.formvalue("dtim_period")
    info.shpreamble  = http.formvalue("shpreamble")
    info.wmm         = http.formvalue("wmm")

    info_5.disabled    = http.formvalue("WrlessEnable_5")
    info_5.hwmode      = http.formvalue("WrlessMode_5")
    info_5.channel     = http.formvalue("channel_5")
    info_5.htmode      = http.formvalue("chanWidth_5")
    info_5.txpower     = http.formvalue("power_5")
    info_5.rts         = http.formvalue("rts_5")
    info_5.shpreamble  = http.formvalue("shpreamble_5")
    info_5.wmm         = http.formvalue("wmm_5")
    for k, v in pairs(info) do
        uci_set_wireless(k, v, "wifi0")
    end
    for k, v in pairs(info_5) do
        uci_set_wireless(k, v, "wifi1")
    end

    OE("uci commit wireless >/dev/null 2>&1")
    OE("wifi >/dev/null 2>&1")
    local str = "var status = \"1\"; var errorstr = \"\";"
    http.write_json(str)
end


function get_lan_info()
    local _type   = SS(exec("uci get network.lan.proto"), 1, -2)
    local lanIp   = SS(exec("ifconfig br-lan | grep \"inet addr\" | awk '{print $2}'"),6, -2)
    local netMask = SS(exec("ifconfig br-lan | grep \"inet addr\" | awk '{print $4}'"),6, -2)
    local gateway = SS(exec("route | grep default | awk '{print $2}'"), 1, -2)
    local dns     = SS(exec("cat /etc/resolv.conf | grep nameserver | awk 'NR==1 {print $2}'"), 1, -2)
    local lanMac  = SS(exec("ifconfig br-lan | grep HWaddr | awk '{print $5}'"), 1, -2)

    local str = ""
    str = str .. SF("var type  = \"%s\";", _type)
    str = str .. SF("var lanIp  = \"%s\";", lanIp)
    str = str .. SF("var netMask = \"%s\";", netMask)
    str = str .. SF("var gateway = \"%s\";", gateway)
    str = str .. SF("var dns = \"%s\";", dns)
    str = str .. SF("var lanMac = \"%s\";", lanMac)
    http.write_json(str)
end


function set_lan_config()
    local _type   = http.formvalue("type")
    local lanIp   = http.formvalue("lanIp")
    local netMask = http.formvalue("netMask")
    local gateway = http.formvalue("gateway")
    local dns     = http.formvalue("dns")

    if _type == 'dhcp' then
        OE("uci set network.lan.proto=dhcp >/dev/null 2>&1")
        OE("uci delet network.lan.ipaddr >/dev/null 2>&1")
        OE("uci delet network.lan.netmask >/dev/null 2>&1")
    elseif _type == 'static' then
        OE("uci set network.lan.proto=static >/dev/null 2>&1")
        OE("uci set network.lan.netmask=" .. netMask .. ">/dev/null 2>&1")
        OE("uci set network.lan.ipaddr=" .. lanIp .. ">/dev/null 2>&1")
        OE("uci set network.lan.gateway=" .. gateway .. ">/dev/null 2>&1")
        OE("uci set network.lan.dns=" .. dns .. ">/dev/null 2>&1")
    end

    OE("uci commit network >/dev/null 2>&1")
    OE("/etc/init.d/network restart >/dev/null 2>&1")
    local str = "var status = \"1\"; var errorstr = \"\";"
    http.write_json(str)
end


function fastConfigPop()
    local notPopUps = SS(exec("uci get APConfig.ap.notPopUps"), 1, -2)
    if notPopUps == "" then notPopUps = '0' end
    local str = SF("var notPopUps=\"%s\";", notPopUps)
    http.write_json(str)
end


function fastConfigNet()
    get_lan_info()
    --http.write_json(str)
end


function setfastConfigPop()
    local notPopUps = http.formvalue("notPopUp") 
    OE("uci set APConfig.ap.notPopUps=" .. notPopUps .. ">/dev/null 2>&1")
    OE("uci commit >/dev/null 2>&1")
    local str = "var status = \"1\"; var errorstr = \"\";"
    http.write_json(str)
end


function system_state()
    local str  = ""
    local time = os.date('%Y-%m-%d %H:%M:%S')
    local d = exec("cat /proc/uptime | awk -F. '{d=$1 / 86400; printf(\"%d\", d)}'")     
    local h = exec("cat /proc/uptime | awk -F. '{h=($1 % 86400)/3600; printf(\"%d\", h)}'")
    local m = exec("cat /proc/uptime | awk -F. '{m=($1 % 3600)/60; printf(\"%d\", m)}'")
    local s = exec("cat /proc/uptime | awk -F. '{s=($1 % 60); printf(\"%d\", s)}'")

    str = str .. SF("var systemTime=\"%s\";", time)
    str = str .. SF("var d = \"%s\";", d)
    str = str .. SF("var h = \"%s\";", h)
    str = str .. SF("var m = \"%s\";", m)
    str = str .. SF("var s = \"%s\";", s)
    str = str .. SF("var serialNumber=\"%s\";", SN)
    str = str .. SF("var product=\"%s\";", MODEL)
    str = str .. SF("var hardware=\"%s\";", HWVERSION)
    str = str .. SF("var software=\"%s\";", SWVERSION)
    http.write_json(str)
end


function clockManage()
    local str = ""
    --openwrt 有点奇怪，这里对时区要做相反数处理，如果有人找到问题原因，请把这个坑填了
    local Timezones = tostring(-tonumber(SS(exec("cat /etc/TZ"), 4, -2)))

    local server1 = SS(exec("uci get system.ntp.server | awk '{print $1}'"), 3, -2)
    local server2 = SS(exec("uci get system.ntp.server | awk '{print $2}'"), 3, -2)
    local server3 = SS(exec("uci get system.ntp.server | awk '{print $3}'"), 3, -2)
    local sntp_enables = SS(exec("uci get system.ntp.enable_server"), 1, -2)
    str = str .. SF("var errorstr=\"\";")
    --这里lua获取到的秒数看起来是已经和时区计算过了，直接传给页面就可以
    str = str .. SF("var sysDateTimes=\"%s\";", os.time())
    str = str .. SF("var dst_switch=\"off\";")
    str = str .. SF("var Timezones=\"%s\";", Timezones)
    str = str .. SF("var sntp_enables=\"%s\";", sntp_enables)
    str = str .. SF("var server1s=\"%s\";", server1)
    str = str .. SF("var server2s=\"%s\";", server2)
    str = str .. SF("var server3s=\"%s\";", server3)
    http.write_json(str)
end


function set_ntp_config()
    local ymd           = http.formvalue("ymd")
    local hour          = http.formvalue("hour")
    local min           = http.formvalue("min")
    local second        = http.formvalue("second")
    local server1       = http.formvalue("NTPServerIP")
    local server2       = http.formvalue("server2")
    local server3       = http.formvalue("server3")
    local timezone      = http.formvalue("time_zone")
    local enable_server = http.formvalue("SntpEnable")

    if tonumber(timezone) > 0 then
        OE("echo \"UTC-\"" .. timezone .. ">/etc/TZ")
    elseif tonumber(timezone) == 0 then
        OE("echo \"UTC>/etc/TZ\"")
    else
        OE("echo \"UTC+\"" .. timezone .. ">/etc/TZ")
    end

    OE("uci set system.ntp.server=0." .. server1 .. ">/dev/null 2>&1")
    OE("uci add_list system.ntp.server=1." .. server2 .. ">/dev/null 2>&1")
    OE("uci add_list system.ntp.server=2." .. server3 .. ">/dev/null 2>&1")
    OE("uci set system.ntp.enable_server=" .. enable_server .. ">/dev/null 2>&1")
    OE("uci commit system >/dev/null 2>&1")
    OE("/etc/init.d/sysntpd restart >/dev/null 2>&1")

    --linux设置时间命令 date -s "2017-12-01 12:00:00"
    if enable_server == '0' then
        OE("date -s \"" .. ymd .. " " .. hour .. ":" .. min .. ":" .. second .. "\" >/dev/null 2>&1")
    end

    local str = "var errorstr=\"\"; var status=\"1\";"
    http.write_json(str)
end


function update()
    local str = ""
    str = str .. "var ProductLinkID=\"http://www.utt.com.cn/downloadcenter.php?filetypeid=3&model=6530G&lang=zhcn\";"
    str = str .. SF("var revisions=\"%s\";", SWVERSION)
    str = str .. SF("var hardwareID=\"%s\";", HWVERSION)
    http.write_json(str)
end


function UpdateFirmware()
	local fp
	luci.http.setfilehandler(
		function(meta, chunk, eof)
			if not fp then
				if meta and meta.name == "image" then
					fp = io.open(image_tmp, "w")
				else
					fp = io.popen(restore_cmd, "w")
				end
			end
			if chunk then
				fp:write(chunk)
			end
			if eof then
				fp:close()
			end
		end
	)
end
