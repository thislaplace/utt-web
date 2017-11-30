--[[
LuCI - Lua Configuration Interface

Copyright 2008 Steven Barth <steven@midlink.org>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

$Id$
]]--

require("luci.tools.webadmin")
m = Map("wtp",
	translate("WTP"),
	"")
	

s = m:section(NamedSection, "addr", "interface", translate("WTP config"))
s.addremove = flase

ac_addr1 = s:option(Value, "ac_addr1", translate("AC1 address"))
ac_addr1.datatype = "ip4addr"
ac_addr2 = s:option(Value, "ac_addr2", translate("AC2 address"))
ac_addr2.datatype = "ip4addr"
ac_addr3 = s:option(Value, "ac_addr3", translate("AC3 address"))
ac_addr3.datatype = "ip4addr"

local apply = luci.http.formvalue("cbi.apply")
if apply then
     io.popen("/sbin/capwap-init.sh")
end

return m
