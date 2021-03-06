define({
		help:[
{
pLink:"config_wizard", // 子页面部分链接
	  link:{id:"1", tl:"配置向导"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'配置向导'},

	      /*短文字*/
	      {p  :'首次登录Web界面需要对系统进行初始化配置，便于基本通信。配置向导按步骤指导您配置上网所需基本参数，使内网用户通过设备快速连接因特网。'},
	      {p  :'根据运营商提供的上网参数确定上网连接方式。'},
	      

	     
	      /*表格*/
	      {p  :
		  [
		      ['选项'   ,'描述'],
		  ['动态接入','使用动态接入方式，设备从运营商DHCP服务器处获取IP地址。每次拨通运营商的主机后，路由器自动获得一个动态的IP地址。任意两次连接所获取的IP地址很可能不同，但是在每次连接时间内IP地址保持不变。'],
		  ['固定接入','输入申请宽带时运营商提供的IP地址、子网掩码、网关地址、DNS服务器地址。'],
		  ['PPPoE接入','输入申请宽带时运营商提供的用户名和密码。PPPoE是基于以太网的点对点协议。该协议具有用户认证及通知IP地址的功能，是在以太网络中转播PPP帧信息的技术，尤其适用于ADSL等方式。。']
		  ]
	      },
	      
	      ]
}
,
{
pLink:"system_state", // 子页面部分链接
	  link:{id:"1", tl:"系统监控"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'系统状态'},
	      
	      /*短文字*/
	      {p  :'查看系统状态信息，了解路由器的当前运行情况，保证路由器工作正常。用户可定制显示在该页面的内容。'},
	      {p  :'系统状态页面用图表形式显示如下内容：'},
	      
	      {p  :
		  		[
		   		['选项'   ,'描述'],
			  		['带宽','显示路由器各接口的状态信息，包括接口的实时上传下载流量、连接状态等。'],
			  		
			  		['系统负载','显示系统资源使用情况和系统信息。当系统资源占用超过50%后用红色突出显示。'],
			  		['今日应用流量排名','只有开启流量监控功能才会产生应用流量排名统计信息。'],
			  		['今日用户流量排名','显示今日（从0点到24点）的网络流量使用排名情况。'],
			  		['VPN状态','显示当前已经建立的VPN隧道的实时状态。。']
		  		]
	      },
	      
	      {ss  :'提示: 不同型号、不同配置的路由器的状态显示存在差异，请以路由器的实际情况为准。'},
	      

	      	      ]
}
,
{
pLink:"traffic_watcher", // 子页面部分链接
	  link:{id:"1", tl:"系统监控"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'流量监控'},
	      /*
	      {t2 :'二级标题'},
	      {t3 :'三级标题'},
	      */

	      /*短文字*/
	      /*
	      {s  :'普通一行短文字（首行无缩进）'},
	      {ss :'提示短文字   （首行无缩进）'},
	      */

	      /*段落*/
	      {p  :'通过流量监控了解今日各应用分类的流量使用情况。系统已将各应用进行分类归纳，按照如下步骤查看各应用分类情况。'},
	      {p  :'1.选择行为管理>行为管理页面。'},
	      {p  :'2.点击“新增”按钮并在跳转后的页面中单击“应用服务”文本框。'},
	      {p  :'3.在弹出的应用列表中查看详细应用分类情况。'},
	      {ss :'提示：只有开启流量监控功能才会产生应用流量统计信息。'},
	      /*列表*/
	      /*
	      {p  :['列表名称1','列表内容111111111111']},
	      {p  :['列表名称2','列表内容222222222222']},
	      {p  :['列表名称3','列表内容333333333333']},
	      */

	      /*表格*/
	      /*{p  :
		  [
		      ['表格'   ,'属性名1','属性名2','属性名3'],
		  ['对象名1','11','12','13'],
		  ['对象名2','12','22','23']
		  ]
	      },
	      */
	      ]
}
,
{
pLink:"WAN_config", // 子页面部分链接
	  link:{id:"1", tl:"网络配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'外网配置'},
	      {t2 :'外网配置'},
	      /*{t3 :'三级标题'},*/

	      /*短文字*/
	      {p  :'配置各WAN口与外网的连接方式，也可以查看各线路的连接状态。路由器支持三种连接方式：固定接入、动态接入和PPPoE接入。不同的线路连接类型，配置的参数也不同。'},
	      
	      /*{ss :'提示短文字   （首行无缩进）'},*/
	      {t3 :'固定接入'},

	      /*段落*/
	      {p  :'路由器长期使用固定IP地址接入外网，一般是特殊的服务器才使用固定IP地址接入网络，例如设立了因特网服务的组织机构，其主机对外开放了诸如WWW、FTP、E-mail等访问服务，通常需要对外公布一个固定的IP地址，以方便用户访问。'},

	      /*列表*/
	      /*{p  :['列表名称1','列表内容111111111111']},
	      {p  :['列表名称2','列表内容222222222222']},
	      {p  :['列表名称3','列表内容333333333333']},*/

	      /*表格*/
	      {p  :
		  [
		  ['选项'   ,'描述'],
		  
		  ['运营商','提供三个选项供选择：电信、移动、联通。当有多条线路连接外网时，系统将根据用户的选择生成相对应的路由，可以方便地实现电信流量走电信线路，联通流量走联通线路。'],
		  ['工作模式','选选择上网方式。提供两个选项供选择：路由模式和NAT模式。'],
		  ['线路类型','选择此接口代表的线路类型，提供两个选项供选择：主线路，备份线路。系统默认开启智能负载均衡模式，当有线路出现故障时，不同的线路类型，流量的走向也不同，详情参阅章节：智能负载均衡。'],
		  ['IP地址、子网掩码、网关地址','输入运营商提供的IP地址、子网掩码、网关地址。'],
		  
		  ['上、下行带宽','配置该线路允许通过的最大上、下行带宽。建议配置为运营商分配的带宽，即申请带宽时，运营商提供的上、下行带宽。只有正确配置上、下行带宽，“应用优先”、“保障带宽”等功能才能正常运行。'],
		  ['限制比','带宽拥堵时，低优先级速度减小比例，配置越高，低优先级减速幅度越大，建议配置 25%'],
		  ['带宽下限','带宽最低使用率，保证带宽低优先级减速时，总带宽至少可用带宽比例，建议配置 75%'],
		  ['带宽上限','带宽最高使用率，流控功能需要根据带宽上限，动态调整低优先级的速度，建议配置85%'],
		  
		  ['端口速率','配置该接口的双工模式及速率。一般情况下不需要修改，如有兼容性问题或使用的设备不支持自动协商功能，可以在这里设置以太网协商的类型。'],
		  ['MAC地址','相应接口的MAC地址。一般不建议修改接口的MAC地址。但在某些情况下，运营商将设备的MAC做了绑定，这样造成新的网络设备无法拨号成功，此时需要将设备的MAC地址修改为原网络设备的MAC地址。'],
		  ['主、备DNS服务器','输入运营商提供的主、备DNS服务器。'],
		  
		  ['网关绑定方式','绑定上层网关地址的方式，提供的选项为：不绑定、手工绑定。选择“手动绑定”时可点击“获取”按钮获取上层网关MAC，也可自己手动输入上层网关MAC。注意：当绑定错误的网关MAC时，上网功能会异常。']
		  ]
	      },
	      {t3 :'动态接入'},
	      {p  :'通过运营商DHCP服务器动态分配的IP地址实现上网。采用动态接入方式时，若需要从WAN口访问设备，需配合DDNS功能使用。'},
		  {p  :
		    [
			
			['运营商','提供三个选项供选择：电信、移动、联通。当有多条线路连接外网时，系统将根据用户的选择生成相对应的路由，可以方便地实现电信流量走电信线路，联通流量走联通线路。'],
			['工作模式','选择上网方式。提供两个选项供选择：路由模式和NAT模式。'],
			['线路类型','选择此接口代表的线路类型，提供两个选项供选择：主线路，备份线路。系统默认开启智能负载均衡模式，当有线路出现故障时，不同的线路类型，流量的走向也不同，详情参阅章节：智能负载均衡。'],
			
			['上、下行带宽','配置该线路允许通过的最大上、下行带宽。建议配置为运营商分配的带宽，即申请带宽时，运营商提供的上、下行带宽。只有正确配置上、下行带宽，“应用优先”、“保障带宽”等功能才能正常运行。'],
			['限制比','带宽拥堵时，低优先级速度减小比例，配置越高，低优先级减速幅度越大，建议配置 25%'],
			['带宽下限','带宽最低使用率，保证带宽低优先级减速时，总带宽至少可用带宽比例，建议配置 75%'],
			['带宽上限','带宽最高使用率，流控功能需要根据带宽上限，动态调整低优先级的速度，建议配置85%'],
			
			
			['端口速率','配置该接口的双工模式及速率。一般情况下不需要修改，如有兼容性问题或使用的设备不支持自动协商功能，可以在这里设置以太网协商的类型。'],
			['MAC地址','相应接口的MAC地址。一般不建议修改接口的MAC地址。但在某些情况下，运营商将设备的MAC做了绑定，这样造成新的网络设备无法拨号成功，此时需要将设备的MAC地址修改为原网络设备的MAC地址。'],
			['主、备DNS服务器','输入运营商提供的主、备DNS服务器。'],
			
		    ]
		},



	      {t3 :'PPPoE接入'},
		{p  :'PPPoE全称Point to Point Protocol over Ethernet，是基于以太网的点对点协议。该协议具有用户认证的功能，是在以太网络中转播PPP帧信息的技术，尤其适用于ADSL等方式。'},
		{p  :
		    [
			
			['运营商','提供三个选项供选择：电信、移动、联通。当有多条线路连接外网时，系统将根据用户的选择生成相对应的路由，可以方便地实现电信流量走电信线路，联通流量走联通线路。'],
			['工作模式','选择上网方式。提供两个选项供选择：路由模式和NAT模式。'],
			['线路类型','选择此接口代表的线路类型，提供两个选项供选择：主线路，备份线路。系统默认开启智能负载均衡模式，当有线路出现故障时，不同的线路类型，流量的走向也不同，详情参阅章节：智能负载均衡。'],
			['上网账号、上网密码','在运营商办理业务时，运营商提供的用户名和密码。'],
			
			['验证方式','ISP验证用户名及密码的方式，默认为EITHER。多数地区为PAP方式，也有少数地区采用CHAP方式，NONE表示不进行用户名和密码验证，EITHER表示自动和对方设备协商采用哪种验证方式。'],

			['拨号类型','自动拨号：启用路由器或者上一次拨号断线后，系统自动拨号连接。手动拨号：由用户点击在“网络配置”>“外网配置”>“外网配置”页面的右上方的相关按钮进行手动连接和挂断。按需拨号：当内网访问Internet产生流量时，设备自动进行连接。'],
			
			['拨号模式','选择PPPoE拨号的模式。默认为普通模式。在使用正确的用户名和密码的前提下，如果拨号不成功，可以尝试使用其它模式。'],

			['上、下行带宽','配置该线路允许通过的最大上、下行带宽。建议配置为运营商分配的带宽，即申请带宽时，运营商提供的上、下行带宽。只有正确配置上、下行带宽，“应用优先”、“保障带宽”等功能才能正常运行。'],
			['限制比','带宽拥堵时，低优先级速度减小比例，配置越高，低优先级减速幅度越大，建议配置 25%'],
			['带宽下限','带宽最低使用率，保证带宽低优先级减速时，总带宽至少可用带宽比例，建议配置 75%'],
			['带宽上限','带宽最高使用率，流控功能需要根据带宽上限，动态调整低优先级的速度，建议配置85%'],

			['空闲时间','无访问流量后自动断线前等待的时长，0代表不自动断线（单位：分钟）。'],
			['MTU值','最大传输单元。在传送数据单元时，设备将自动与对端设备协商最佳的传送数据单元大小，除非特别应用，不要修改此参数。'],
			['端口速率','配置该接口的双工模式及速率。一般情况下不需要修改，如有兼容性问题或使用的设备不支持自动协商功能，可以在这里设置以太网协商的类型。'],
			
			['MAC地址','相应接口的MAC地址。一般不建议修改接口的MAC地址。但在某些情况下，运营商将设备的MAC做了绑定，这样造成新的网络设备无法拨号成功，此时需要将设备的MAC地址修改为原网络设备的MAC地址。'],
			['主、备DNS服务器','输入运营商提供的主、备DNS服务器。'],
			
		    ]
		},
		{ss :'智能负载均衡'},
		{p  :'设备提供了2种线路类型：主线路和备份线路。所有线路默认都是主线路，用户可以根据需要将某些线路划分到备份线路组中。'},
		{p  :'在所有线路均作为主线路使用时，智能负载均衡模式的工作原理如下：'},
		{p  :'1.当所有线路都正常时，内网主机将同时使用所有线路上网。'},
		{p  :'2.若某条线路出现故障，则立即屏蔽该线路，原先通过该线路的流量将分配到其他线路上。'},
		{p  :'3.一旦故障线路恢复正常，设备会自动启用该线路，流量自动重新分配。'},
		{p  :'当部分线路为主线路，部分线路为备份线路时，智能负载均衡模式的工作原理如下：'},
		{p  :'1.只要主线路正常，内网主机就使用主线路上网。'},
		{p  :'2.若主线路出现故障，则自动切换到使用备份线路上网。'},
		{p  :'3.一旦故障主线路恢复正常，则立即切换回主线路。'},
		{ss :'弹性带宽'},
		{p  :'限制比、带宽下限、带宽上限出厂配置已配建议值，不建议普通用户修改。'},


	      ]
}
,
{
pLink:"WAN_config", // 子页面部分链接
	  link:{id:"2", tl:"外网配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'全局配置'},
	      /*{t2 :'二级标题'},
	      {t3 :'三级标题'},*/

	      
	      
	      {t2 :'身份绑定'},
	      /*段落*/
	      {p  :'在多线路会话负载均衡的情况下，同一应用的NAT会话可能分布在不同的线路上，这样就会导致像网银、QQ等应用由于身份变化而不能正常使用，身份绑定功能通过将这些来自同一用户的同一应用的会话绑定在一条线路上解决了这个问题。举个例子来说，内网某个用户在登录网上银行时，如果第一条会话被分配到WAN2口连接线路上，此后此用户所有的网银会话都会走WAN2口出去，直到此用户退出登录。'},

	      {t2 :'线路检测'},
	      {p  :['检测间隔：','发送检测包的时间间隔，一次发送一个检测包，缺省值为0秒。特别地，该值为0时，表示不进行线路检测。']},
	      {p  :['检测次数：','每个检测周期内，发送检测包的次数。']},
	      {p  :['目标IP地址：','检测的对象，设备将向预先指定的检测目标发送检测包以检测线路是否正常。设备在线路正常和线路故障两种情况下的线路检测机制。']},
	      {p  :['某条线路故障时，检测机制为：','设备每隔指定的检测间隔向该线路的检测目标发送一个检测包，如果在某个检测周期内，发送的所有检测包都没有回应，就认为该线路出现故障，并立即屏蔽该线路。例如，缺省情况下，若某个检测周期内，发送的3个检测包都没有回应，就认为该线路出现故障。']},
	      {p  :['某条线路正常时，检测机制为：','设备每隔指定的检测间隔向该线路的检测目标发送一个检测包，如果在某个检测周期内，发送的检测包中有一半及以上数量的检测包有回应时，就认为该线路已经正常，并恢复启用该线路。例如，缺省情况下，若某个检测周期内，有2个检测包有回应，就认为该线路恢复正常。']},
	      {p  :'设备允许用户预先为内网中的某些主机指定上网线路，它是通过设置线路的“内部起始IP地址”和“内部结束IP地址”来实现的，IP地址属于两个地址范围内的主机将优先使用指定线路。对于已指定上网线路的主机来说，当指定线路正常时，它们只能通过该线路上网；但是，当指定线路有故障时，它们会使用其他的正常线路上网。'},

	    ]
}
,
{
pLink:"LAN_config", // 子页面部分链接
	  link:{id:"1", tl:"网络配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'内网配置'},
	      {t2 :'LAN口配置'},
	      {p  :
		  [
		    ['选项'   ,'描述'],
		    ['名称','配置接口的名称。'],
		    ['IP地址','配置接口的IP地址。注意：修改过原有LAN口IP地址后，必须使用新的IP地址登录设备，且登录主机的IP要和其在同一网段！'],
		    ['子网掩码','配置接口的子网掩码。'],
		    ['VLAN ID','配置接口VLAN ID，路由器通过VLAN ID识别接入者身份，从而对接入者分类作流量限制、安全认证等策略。此功能必须配合支持802.Q vlan的设备使用，例如管理型交换机、艾泰AP等。']
		  ]
	      },

	      {t2 :'全局配置'},
	      {p  :'配置接口的MAC地址与接口模式。'},
	      /*表格*/
	      {p  :
		  [
		    ['选项'   ,'描述'],
		    ['MAC地址','LAN口的MAC地址。建议不要随意修改LAN口的MAC地址。'],
		    ['接口模式','配置该接口的双工模式及速率。一般情况下不需要修改，如有兼容性问题或使用的设备不支持自动协商功能，可以在这里设置以太网协商的类型。']
		  ]
	      },


	      /*{t3 :'三级标题'},*/

	      /*短文字*/
	      /*{s  :'普通一行短文字（首行无缩进）'},
	      {ss :'提示短文字   （首行无缩进）'},*/

	      /*段落*/
	      /*{p  :'一个大段落（首行缩进）大段落大段落大段落'},*/

	      /*列表*/
	      /*{p  :['列表名称1','列表内容111111111111']},
	      {p  :['列表名称2','列表内容222222222222']},
	      {p  :['列表名称3','列表内容333333333333']},*/

	      /*表格*/
	       /*{p  :
		  [
		      ['表格'   ,'属性名1','属性名2','属性名3'],
		  ['对象名1','11','12','13'],
		  ['对象名2','12','22','23']
		  ]
	      },*/
	      ]
}
,
{
pLink:"DHCP_server", // 子页面部分链接
	  link:{id:"1", tl:"网络配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'DHCP服务'},
	      {t2 :'DHCP服务配置'},
	      /*{t3 :'三级标题'},*/

	      /*短文字*/
	      {p  :'设备默认将default地址池中的地址下发给客户端，管理员可通过创建新的地址池，让不同属性（如属于不同部门）的客户端获取不同网段的IP地址。'},
	      /*表格*/
	      {p  :
		  [
		      ['选项','描述'],
		      ['接口 ','配置DHCP服务器的VLAN接口。携带此接口所属VLAN ID身份识别符的接入者，将从该地址池获取地址。'],
		      ['起始地址、结束地址','配置DHCP地址池的起始IP地址、结束IP地址，起始IP地址与结束IP地址一起定义DHCP服务器的地址范围，注意必须保持和设备LAN口IP地址在同一网段。'],
		      ['子网掩码','配置DHCP服务器给内网计算机自动分配的子网掩码。'],
		      ['网关地址','下发给DHCP客户端的网关地址，一般为设备LAN口IP地址。'],
		      ['租期','内网计算机使用DHCP服务器分配的IP地址的时长。'],
		      ['主DNS服务器','DHCP服务器给内网计算机自动分配的主DNS服务器IP地址。'],
		      ['备DNS服务器','DHCP服务器给内网计算机自动分配的备用DNS服务器IP地址。'],
		      ['Option43','通过修改dhcp 协议报文里的option 43可变长字段，用来携带AC的IP地址，让AP解析option 43携带的AC地址，用来发现AC。其中有不启用、HEX定长、ASCII不定长、自定义四个选项。HEX定长：填写AC地址，将AC地址解析成十六进制编码数字组成。ASCLL不定长：不定长编码，将AC地址解析成一组字符。自定义：如果配置非法，将导致DHCP服务器异常或option43配置不生效。']
		  ]
	      },

	      {t2 :'静态DHCP'},
	      {p  :'使使用DHCP服务器为内网计算机配置TCP/IP属性是非常方便的，但会造成计算机在不同时间段被分配到不同IP地址。静态DHCP功能可以使内网计算机的MAC地址与IP地址绑定，当计算机向DHCP服务器（设备）申请地址时，设备根据计算机的MAC地址寻找对应的IP地址并分配给计算机，使计算机在任何时段都能使用不变的唯一IP地址。'},

	    ]
}
,
{
pLink:"port_mapping", // 子页面部分链接
	  link:{id:"1", tl:"网络配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'端口映射'},
	      {t2 :'静态映射和虚拟服务器（DMZ主机）'},
	      /*{t3 :'三级标题'},*/

	      /*短文字*/
	      {p  :'某些应用环境下，外网中的计算机希望通过设备访问内网服务器，这时需要在设备上设置静态映射或虚拟服务器（DMZ主机）。'},
	      {p  :'通通过静态映射功能，可建立<外部IP地址+外部端口>与<内部IP地址+内部端口>一对一的映射关系，这样，所有对设备某指定端口的服务请求都会被转发到匹配的内网服务器上，从而，外网中的计算机就可以访问这台服务器提供的服务了。'},
	      {p  :'某些情况下，需要将一台内网计算机完全暴露给Internet，以实现双向通信，这时候就需要将该计算机设置成虚拟服务器（DMZ主机）。当有外部用户访问该虚拟服务器所映射的公网地址时，设备会直接把数据包转发到该虚拟服务器上。'},
	      {p  :'静态映射的优先级高于虚拟服务器。当设备收到一个来自外部网络的请求时，它将首先根据外部访问请求的IP地址及端口号，检查是否有匹配的静态映射，如果有的话，就把请求消息发送到该静态映射匹配的内网计算机上。如果没有匹配的静态映射，才会检查是否有匹配的虚拟服务器。'},

	      {t2 :'配置静态映射规则'},
	      /*表格*/
	      {p  :
		  [
		  ['选项','描述'],
		  ['状态','开启或关闭静态映射功能。'],
		  ['规则名称','配置此条规则的名称，自定义，由数字和字母组成，不能重复。。'],
		  ['绑定接口','选择静态映射规则绑定的ＷＡＮ口。'],
		  ['内网地址','配置作为服务器的内网计算机的IP地址。'],
		  ['协议','数据包的协议类型，可供选择的有：TCP、UDP和TCP/UDP；当用户无法确认该应用所使用的协议为TCP或UDP时，可选择TCP/UDP。'],
		  ['端口','内部端口：内网服务器所开服务的连续端口。外部端口：设备提供给Internet的连续服务端口。']
		  ]
	      },


	     

	      {t2 :'UPNP'},
	      {p  :'开启UPNP功能，系统将自动动态建立<外部IP地址+外部端口>与<内部IP地址+内部端口>一对一的映射关系，这样，所有对设备某端口的服务请求都会被转发到匹配的内网服务器上，从而，外网中的计算机就可以访问这台服务器提供的服务了。例如某些P2P下载，开启此功能后，下载速率更高。开启此功能，将增加内网服务器暴露在公网的风险。建议在不使用该功能时，不要启用UPnP功能。'},



	      	      ]
}
,
{
pLink:"port_mapping", // 子页面部分链接
	  link:{id:"2", tl:"网络配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'端口映射'},
	      {t2 :'NAT规则'},
	      /*{t3 :'三级标题'},*/

	      /*短文字*/
	      {p  :'EasyIP：即网络地址端口转换，多个内部IP地址映射到同一个外部IP地址。它可为每个内部连接动态分配一个与单一外部地址有关的端口，并维护这些内部连接到外部端口的映射，从而实现多个用户同时使用一个公网地址与外部Internet进行通信。'},

	      /*表格*/
	      

	      {p  :'One2One：即静态地址转换，内部IP地址与外部IP地址进行一对一的映射。此方式下，端口号不会改变。它通常用来配置外网访问内网的服务器，内网服务器依旧使用私有地址，对外提供为其分配的公网IP地址给外部网络用户访问。'},

	      /*表格*/
	     

	    ]
}
,
{
pLink:"router_config", // 子页面部分链接
	  link:{id:"1", tl:"网络配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'路由配置'},
	      {t2 :'静态路由'},
	      /*{t3 :'三级标题'},*/
	      /*表格*/
	      {p  :'静态路由是由网络管理员手工配置的路由，使得到指定目的网络的数据包的传送，按照预定的路径进行。静态路由不会随网络结构的改变而改变，因此，当网络结构发生变化或出现网络故障时，需要手工修改路由表中相关的静态路由信息。正确设置和使用静态路由可以改进网络的性能，还可以实现特别的要求，比如实现流量控制、为重要的应用保证带宽等。'},
	      {p  :
		  [
		    ['选项','描述'],
		    ['目的网络','配置此静态路由的目的网络号。'],
		    ['子网掩码','配置目的网络的子网掩码。'],
		    ['网关地址','下一跳路由器入口的IP地址，设备通过接口和网关定义一条跳到下一个路由器的线路。通常情况下，接口地址和网关须在同一网段。'],
		
		    ['绑定接口','配置数据包的转发接口，与该静态路由匹配的数据包将从指定接口转发。根据型号的不同选项不同。']
		  ]
	      },
	      {ss  :'提示:当多条路由的目的网络和优先级相同时，设备会根据越晚建立的越先匹配的原则进行匹配。'},

	      {t2 :'策略路由'},
	      {p  :'在本页面定义策略路由，数据包按照源IP地址（适用用户）、协议、目的地址以及目的端口进行路由。'},

	      /*表格*/
	      {p  :
		  [
		    ['选项','描述'],
		    ['执行顺序','配置此策略路由规则的优先级，值越小优先级越高。'],
		    ['绑定接口','配置策略路由绑定的物理接口，满足策略路由条件的数据包将从绑定接口转发出去。'],
		    ['适用用户','配置此策略路由的数据包的源IP地址（适用用户）。'],
		    ['目的地址','设置此策略路由的数据包的目的地址。'],
		    ['自定义IP协议','配置走此策略路由的数据包的目的地址和协议类型。协议：选择的协议类型并配置相应的外部端口和内部端口号。应用服务：走此策略路由的数据包的类型。外部端口：添加连续的端口。范围1~65535，对应的协议有TCP和UDP（当选择的协议为ICMP、AH时不用配置端口范围)。'],
		    ['生效时间','配置策略路由生效的时间段，时间段也可以是不连续的时间点。']
		  ]
	      },
	      {ss  :'提示:'},
	      {ss  :'1.当数据包与定义的适用用户、协议、目的地址、目的端口全部匹配后，将从指定的接口转发出去，找不到匹配策略路由的数据包将走正常的路由。'},
	      {ss :'2.策略路由的执行顺序：LAN口静态路由 > 策略路由 > WAN口静态路由。'},
	     
	      ]
}
,
{
pLink:"DDNS", // 子页面部分链接
	  link:{id:"1", tl:"网络配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'动态域名'},
	      /*{t2 :'二级标题'},
	      {t3 :'三级标题'},*/

	      /*短文字*/
	      {p  :'路由器长期对外提供特殊服务，需要对外公布一个固定的地址，以方便用户访问，而WAN口的接入方式却为动态接入或PPPoE接入，此时，可以使用动态域名功能。'},


	      /*表格*/
	      {p  :
		  [
		    ['选项','描述'],
		    ['服务商','选择相应的服务商。提供的服务商有：3322.org、花生壳、dydns.org、no-ip和uttcare.com。'],
		    ['注册域名','单击域名，在配置DDNS服务之前需到相关网站上申请二级域名及用户名和密码。'],
		    ['主机名','填写已申请的主机名，花生壳可不填写，输入用户名和密码后会自动获取。'],
		    ['用户名','填写注册3322.org、dyndns.com或花生壳时使用的用户名。'],
		    ['密码','填写注册3322.org、dyndns.com、uttcare.com或花生壳时使用的密码。'],
		    ['接口','选择DDNS服务绑定的接口。']
		  ]
	      },
	      ]
}
,
{
pLink:"organize_member", // 子页面部分链接
	  link:{id:"1", tl:"用户管理"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'组织成员'},
	      /*{t2 :'二级标题'},
	      {t3 :'三级标题'},*/

	      /*短文字*/
	      {p  :'组织成员中包含内网所有按组划分的用户。成员按组划分有助于网络安全、流量控制、上网策略等功能按组名或人名做策略。'},
	      {t2 :'组织架构'},
	      {p  :'页面左侧为当前所有用户组的树型结构，有两个根组，可在Root组下新建子组；右侧是左侧组织架构中已定义的组所包含的所有直属用户和子组。未在Root组中定义的用户接入内网中，将分配至临时用户组中。'},
	      
	       {t2 :'用户'},
	       {p  :'要实现网络安全管理，首先必须解决用户的身份识别问题，然后才能进行必要的业务授权工作。设备使用绑定的IP/MAC地址对作为用户唯一的身份识别标识，可以保护设备和网络不受ARP欺骗的攻击。在组织架构页面右侧添加用户，包含两种用户类型，普通用户和认证用户。'},
	       {t3 :'普通用户'},
	       {P :'分三种类型的用户，IP绑定用户、MAC绑定用户和IP/MAC绑定用户。'},
	       {p :'IP/MAC绑定：将MAC地址与IP地址绑定到某用户名下，便于系统识别接入者身份。只有IP和MAC地址都匹配的用户才能接入网络，若只有IP匹配或MAC匹配，将被识别为网络欺骗，从而禁止上网。'},
	       {p :'IP绑定：通过IP识别接入者身份。'},
	       {p :'MAC绑定：通过MAC地址，识别接入者身份。一般不适用三层交换组网环境。'},
	       {t3 :'认证用户'},
	       {p :'分两种类型的用户，PPPoE认证用户和WEB认证用户。认证用户通过对应的认证方式即可接入网络。您也可以通过设置认证用户的绑定方式进一步限定用户范围，从而保证用户的合法性和系统的安全性。'},

	       {t2: '全局配置'},
	       {p : '仅IP/MAC绑定用户能上网：非IP/MAC绑定用户无法访问网络。仅MAC绑定用户能上网：非MAC绑定用户无法访问网络。'},

	     
	      	      	      
	      ]
}
,
{
pLink:"user_authentication", // 子页面部分链接
	  link:{id:"1", tl:"用户管理"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'用户认证'},

	      {p  :'配置用户认证方法，当开启用户认证功能时，只有通过认证的用户才可接入局域网中。系统提供三种认证方式：PPPOE认证、WEB认证、远程认证。'},
	      {t2 :'PPPOE配置'},
	      /*表格*/
	      {p  :
		  [
		    ['选项','描述'],
		    ['强制PPPoE认证','启用/禁用设备的PPPoE服务器功能。启用强制PPPoE认证表示只允许内网PPPoE认证通过的用户访问因特网。'],
		    ['例外地址组','在设备开启强制PPPoE认证后，该地址组的用户可以不通过拨号认证也能与因特网通信，可以在“系统对象”>“地址组”页面配置地址组。'],
		    ['起始IP地址','PPPoE服务器给内网计算机自动分配的起始IP地址。'],
		    ['总地址数','PPPoE服务器给内网计算机自动分配的从起始IP地址开始的连续IP地址的个数。'],
		    ['主DNS服务器/备DNS服务器','PPPoE服务器给内网计算机自动分配的主/备用DNS服务器的IP地址。'],
		    ['密码验证方式','PPPoE验证用户名和密码的方式，设备提供PAP、CHAP以及AUTO三种验证方式，默认值为AUTO，表示系统自动选择PAP或CHAP对拨入用户进行身份验证，一般情况下不需要设置。'],
		    ['系统最大会话数','同时上网的PPPoE接入终端个数的上限。'],
		    ['允许用户修改拨号密码','允许或禁止内网PPPoE拨号用户自助修改拨号密码。当PPPoE客户端拨号成功后，登录自助服务页面修改密码，自助服务页面地址为：http://192.168.1.1/noAuth/poeUsers.asp（该地址为设备LAN口IP地址）。'],
		    
		    ['账号到期通告','开启或关闭账号到期通知用户的功能。'],
		    ['账号到期提前通告时间','配置提前几天通知用户账号将到期。例如：设置为10时，表示从账号到期前10天开始，当用户拨号成功，第一次访问网站时会收到设备发送的到期通告。提示：内网拨号用户账号过期后，仍能够拨号成功，能够访问设备，但不能访问因特网；同时访问网站时会收到设备发送的到期通告。'],
		    ['账号通告页面','配置账号到期通告页面使用的模板。']
		  ]
	      },

	      {t2 :'本地认证'},
	      {p  :'启用WEB认证，用户在电脑、手机等设备上通过认证后才可访问因特网。'},
	      {p  :
		  [
		    ['选项','描述'],
		    ['认证页面','配置认证页面的模板。 '],
		    ['无流量下线时间','配置用户通过认证后，多久未产生流量会被踢下线。'],
		    ['允许用户修改认证密码','启用或禁止用户自助修改认证密码。']
		    
		  ]
	      },

	      {t2 :'远程认证'},
	      {p  :'远程认证用于验证用户是否有权限访问因特网。启用该功能后，设备将用户的认证信息存储到远程云服务器上，当用户访问英特网时，远程服务器会自动生成用户所需的认证信息。内网用户只需要使用艾泰科技支持远程认证的任意设备，就可以在任何地点认证，并访问英特网，且云服务器端提供定制认证模板功能，有利于商家定制广告，达到免费推销产品效果。'},
	      {p  :
		  [
		    ['选项','描述'],
		    ['序列号','设备的唯一序列号。  '],
		    ['激活码','和序列号相对应，且唯一。可以使用序列号和激活码注册艾泰WiFi营销系统账号。'],
		    ['无流量下线时间','启用或禁止用户自助修改认证密码配置用户通过认证后，多久未产生流量后被踢下线。'],
		    ['域名名称','配置免认证的域名或IP，例如设置用户在未通过认证前也可以访问http://www.utt.com.cn，则可将该域名添加到域名白名单中。'],
		    ['白名单列表','显示域名白名单列表。']
	      ]
	      },

	      {t2 :'免认证'},
	      {p :'配置免认证用户，免认证用户可以无需认证即可访问英特网。'},

	      
	      	      
	      ]
}
,
{
pLink:"behavior_management", // 子页面部分链接
	  link:{id:"1", tl:"行为管理"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'行为管理'},

	      /*短文字*/
	      {p  :'制定上网行为管理规则，对内网特殊用户在指定时间内的上网行为作策略禁止操作。如果功能不生效，请更新策略库。'},
	      {p  :'页面右上方是行为管理功能的全局开关，只有打开此开关，配置的行为管理规则才会生效。'},
	      {p  :
		  [
		    ['选项','描述'],
		    ['适用用户','配置上网行为管理规则生效的用户。默认为全部用户，也可以通过组织架构选择指定的用户，或通过IP地址指定用户。'],
		    ['应用服务','当选择的应用无法被禁止时，请至“系统配置>系统维护>应用特征库”更新策略。'],
		    ['生效时间','配置该上网行为管理规则生效的时间。'],
		   
	      ]
	      },


	      	      ]
}
,
{
pLink:"domain_filter", // 子页面部分链接
	  link:{id:"1", tl:"行为管理"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'域名过滤'},

	      /*短文字*/
	      {p  :'制定域名过滤规则，对内网部分用户在指定时间内的访问特殊域名行为作策略允许或禁止操作，还可配置网页通告模板内容提示用户这是正常现象。'},
	      {p  :
		  [
		    ['选项','描述'],
		    ['适用用户','配置域名过滤规则生效的用户。默认为全部用户，也可以通过组织架构选择指定的用户，或通过IP地址指定用户。  '],
		    
		    ['生效时间','配置域名过滤规则生效的时间。'],
		   ['动作','勾选“允许”允许用户访问指定域名，勾选“禁止”禁止用户访问指定域名。'],
		   ['过虑域名','配置需要过滤的域名。'],
		   ['域名列表','显示被过滤的域名列表。'],
		   ['终端接入提醒','开启或关闭终端接入提醒功能。当开启终端接入提醒功能时，若用户被禁止访问某个网站时，希望给用户一个提示，表示此网站被禁止而非网络问题，配置域名过滤通知。'],
		   ['接入提醒','选择客户端接入指定域名时的提醒方式：“发布通告”或“重定向”。'],
		   ['方式','若选择“发布通告”方式，在“通告页面”中配置提示模板。当用户访问域名列表中的网站时，系统将用网页提示形式告知用户，显示内容为通告模板内容。若选择“重定向”方式，在“重定向IP”中配置IP地址，当用户访问域名列表中的网站时，网页将跳转到指定的重定向IP。']
	     ]
	      },

	      	      ]
}
,
{
pLink:"white_list", // 子页面部分链接
	  link:{id:"1", tl:"行为管理"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'白名单'},

	      /*短文字*/
	      {p  :'配置QQ与阿里旺旺白名单。在“行为管理“页面禁止QQ与阿里旺旺应用后，QQ与阿里旺旺白名单用户仍可以正常登录。'},
	      {p  :'点击“全局配置”按钮，开启或关闭QQ白名单、400/800企业QQ白名单、阿里旺旺白名单功能。'},

	      	      ]
}
,
{
pLink:"electro_report", // 子页面部分链接
	  link:{id:"1", tl:"行为管理"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'电子通告'},

	      /*短文字*/
	      {p  :'配置日常事务电子通告模板。用户打开网页时，日常事务以Web页面的形式发送给用户。用户收到通告后，在浏览器地址栏再次输入相应地址即可正常访问网站。'},

	      	      ]
}
,
{
pLink:"network_manage_strategy", // 子页面部分链接
	  link:{id:"1", tl:"系统配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'网管策略'},
	      {t2 :'系统管理员'},
	      {p  :'配置不同读写权限的系统管理员。系统管理员可以登录Web管理界面配置和维护系统。'},
	      
	      {t2 :'内网访问控制'},
	      /*{t3 :'三级标题'},*/

	      /*短文字*/
	      {p  :'为了安全管理网络，可以限制指定用户访问路由器。'},
	      {p  :
		  [
		    ['选项','描述'],
		    ['内网访问控制','开启或关闭内网访问控制功能。'],
		    ['选择用户','配置内网中可以访问路由器的用户。默认为全部用户，也可以通过组织架构选择指定的用户，或通过IP地址指定用户。。']
		  ]
	      },

	      {t2 :'远程管理'},
	      {p  :'开启此功能便于管理员从因特网远程维护与管理路由器。'},
	      /*表格*/
	      {p  :
		  [
		    ['选项','描述'],
		    ['状态','开启或关闭远程管理功能。'],
		    ['端口','配置远程管理端口（默认值为8081）。开启远程管理功能后，如要从Internet 通过WEB管理设备必须用“IP 地址：端口”的方式（例如http://218.21.31.3:8081）才能登录设备。注意：若把端口修改成80，在“网络配置”>“端口映射”>“静态映射”页面中增加一条TCP80端口的映射，此时如需要再次增加内网WEB服务器的映射，就会引起冲突。']
		  ]
	      },
	      {ss :'提示:'},
	      {ss :'1.设备的 Internet 地址可以从“网络配置 > 外网配置”页面中获知。'},
	      {ss :'2.如果WAN1采用PPPoE拨号，其IP地址是动态的，可在“网络配置 > 动态域名”中配置DDNS功能。'},
	      {ss :'3.为安全起见，如非必要，请不要启用远程管理功能；在寻求艾泰科技客服工程师服务之前，请事先打开远程管理功能。'},
	     
	      {t2 :'网管访问策略'},
	      {p  :'设置WEB登录设备的访问策略。'},
	      /*表格*/
	      {p  :
		  [
		    ['选项','描述'],
		    ['网管模式','HTTP：信息是明文形式传输，登录速度快。HTTPS：信息以具有安全性的ssl加密传输协议传输，登录更安全。'],
		    ['内网登录端口','配置登录路由器WEB管理界面时使用的端口号。'],
		    ['WEB UI超时','停留在WEB管理界面未操作的时间，超时界面将被锁定，再次输入用户名及密码即可正常操作。'],
		    ['管理员最大错误登录次数','管理员登录WEB管理界面时输错用户名或密码的次数。'],
		    ['管理员超出登录次数惩罚时间','管理员登录WEB管理界面时输错用户名或密码的次数超过设定值，帐号将被锁定，帐号锁定期间无法登录设备。在此处设置帐号锁定时间。']
		  ]
	      },
	      ]
}
,
{
pLink:"clock_management", // 子页面部分链接
	  link:{id:"1", tl:"系统配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'时钟管理'},

	      /*短文字*/
	      {p  :'为了保证设备各种涉及到时间的功能正常工作，需要准确地设定设备的时钟，使其与当地标准时间同步。'},
	      {p  :'设备提供“手工设置时间”和“网络时间同步”两种设置系统时间的方式，一般建议选择“网络时间同步”功能，路由器将从互联网上获取标准的时间。若网络时间同步有异常，建议更新NTP服务器地址。'},
	      	      ]
}
,
{
pLink:"system_maintenance", // 子页面部分链接
	  link:{id:"1", tl:"系统配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'系统维护'},
	      {t2 :'系统升级'},

	      /*短文字*/
	      {p  :'查看当前系统运行版本信息或升级软件版本。'},

	      {ss :'提示:'},
	      {ss  :'1.请选择合适型号的最新软件；下载的软件适用的硬件版本必须和当前产品的硬件版本一致。'},
	      {ss  :'2.建议升级之前，先到“系统配置”>“系统维护”>“配置管理”备份系统当前配置。'},
	      {ss  :'3.强烈建议在设备负载比较轻（用户比较少）的情况下升级。'},
	      {ss  :'4.升级过程不能关闭设备电源，否则将会导致不可预期的错误甚至不可恢复的硬件损坏。'},
	      {ss  :'5.升级完成后软件会自动重启并生效，无需人工干预。'},

	      {t2 :'配置管理'},
	      {t3 :'导出配置'},
	      {p  :'点击“导出”按钮，路由器会将目前所有已保存配置导出为文件。建议在修改配置或升级软件前备份当前的配置信息。'},
	      {t3 :'导入配置'},
	      {p  :'在加载配置过程中请不要关闭设备电源，以避免不可预期的错误。'},
	      {p  :'导入的配置文件版本与路由器当前配置版本差距过大，将有可能导致路由器现有配置信息丢失，如果有重要的配置信息，请谨慎操作。'},
	      {t3 :'恢复出厂配置'},
	      {p  :'建议在网络配置错误、组网环境变更等情况时使用此功能。'},
	      {p  :'恢复设备出厂配置将删除所有自定义的配置。强烈建议在恢复出厂配置之前，先备份其配置文件。执行本操作后，设备重启。'},

	      	      ]
}
,
{
pLink:"network_tools", // 子页面部分链接
	  link:{id:"1", tl:"系统配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'网络工具'},
	      {t2 :'Ping'},

	      /*短文字*/
	      {p  :'Ping (Packet Internet Grope)，即因特网包探索器，一般用于检测网络通不通。Ping发送一个ICMP回声请求消息给目的地并报告是否收到所希望的ICMP回声应答。'},

	      {t2 :'TraceRoute'},
	      {p  :'Tracert命令用来诊断当前路由器的网络连接状态。'},

	      /*表格*/
	      {p  :
		  [
		    ['选项','描述'],
		    ['IP/域名','设置目的地址IP地址或域名，如果输入地址无效将提示重新输入。如果设置为域名，需要首先配置本机DNS。点击“开始”按钮后，路由器将发送tracert包检测经过哪些路由到达目的地址，并将检测结果显示在测试结果的方框中。 '],
		    ['最小TTL','设置路由跟踪的最小TTL值。 '],
		    ['最大TTL','设置路由跟踪的最大TTL值。 '],
		    ['测试结果','显示TraceRoute结果。']
		  ]
	      },

	      	      ]
}
,
{
pLink:"system_log", // 子页面部分链接
	  link:{id:"1", tl:"系统配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'系统日志'},
	      {t2 :'日志服务器'},

	      /*短文字*/
	      {p  :'设备断电后，系统日志会同步删除。建议配置syslog服务器保存系统日志。'},
	      /*表格*/
	      {p  :
		  [
		    ['选项','描述'],
		    ['启用syslog服务','开启或关闭syslog服务功能后。该功能会将设备运行的大量日志记录信息发送给syslog服务器，便于管理员分析系统的状况、监视系统的活动。'],
		    ['syslog服务器的地址（域名）','配置syslog服务器的地址，可以是IP地址或域名。'],
		    ['syslog服务器端口','设置syslog服务器所开放的服务端口。'],
		    ['syslog消息类型','设置发送syslog的消息类型。'],
		    ['Syslog消息发送间隔','设置日志信息发送时间间隔。']
		  ]
	      },

		    ]
}
,
{
pLink:"task_plan", // 子页面部分链接
	  link:{id:"1", tl:"系统配置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/
	      {t1 :'计划任务'},

	      /*短文字*/
	      {p  :'配置周期性任务供路由器自动执行，例如在空闲时间重启设备，有利于释放缓存，回收资源，提高效率。'},
	      	      ]
}
,
{
pLink:"app_priority", // 子页面部分链接
          link:{id:"1", tl:"应用优先"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              /*标题*/
       /*       {t1 :'应用优先'},
              {t2 :'二级标题'},
              {t3 :'三级标题'},   */

              /*短文字*/
      /*        {s  :'普通一行短文字（首行无缩进）'},
              {ss :'提示短文字   （首行无缩进）'}, */

              /*段落*/
              {p
                  :'在多个应用程序同时请求交换数据包时，定义转发应用数据包的优先级。'},

              {ss :'提示:为保障应用优先功能正确运行，请先配置好WAN口带宽的上行带宽和下行带宽。'},
             /*段落*/
              {p
                  :'页面右上方是应用优先功能的全局开关，只有打开此开关，配置的应用优先规则才会生效。'},


           /*   列表
              {p  :['列表名称1','列表内容111111111111']},
              {p  :['列表名称2','列表内容222222222222']},
              {p  :['列表名称3','列表内容333333333333']},  */

              /*表格*/
              {p  :
                  [
            /*          ['表格'   ,'属性名1','属性名2','属性名3'],  */
                ['选项','描述'], 
                  ['执行顺序','配置规则的执行顺序，数值越小，执行越早，决定规则的属性取值。'],
                  ['优先级','配置此规则中应用数据包转发的优先级别，数值越小，优先级越高。系统优先转发优先级高的应用数据包。'],
                  ['适用用户','配置此规则生效的用户，默认为全部用户，也可以通过组织架构选择指定的用户，或通过IP地址指定用户。'],
                  ['应用服务','配置此规则生效的应用。系统内置几千种应用服务供选择，艾泰将持续不断更新应用服务种类。'],
		  ['上传下载速度','每个用户的独享应用限速'],
                  ['生效时间','配置此规则生效的时间。'],
                ]
              },
              ]
}
,
{
pLink:"traffic_management", // 子页面部分链接
          link:{id:"1", tl:"流量管理"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              /*标题*/
       /*       {t1 :'应用优先'},
              {t2 :'二级标题'},
              {t3 :'三级标题'},   */

              /*短文字*/
              {p  :'用户可以通过流量管理功能限制内网用户的上传、下载速率大小，从而实现带宽的合理分配与利用。'},
             
              {p  :
                  [
                  ['选项','描述'],
                  ['执行顺序','配置规则的执行顺序，数值越小，执行越早，决定规则的属性取值。'],
                  ['适用用户','此流量控制规则生效的用户，默认为全部用户，也可以通过组织架构选择指定的用户，或通过IP地址指定用户。'],
                  ['流控策略','配置此流量控制规则的策略：应用保障或应用限制。应用限制：限制用户的最大上传、下载速率。应用保障：保障用户的最低上传、下载速率。为确保应用的带宽保障生效，请先配置好WAN口的上行、下行带宽。'],
                  ['限速策略','可供选项有“独享”和“共享”；独享表示此范围内的每一个IP地址使用此带宽；共享表示此范围内的IP地址共享此带宽。'],
                  ['生效时间','该条流量控制规则生效的时间。'],
                
                ]
              },
              ]
}
,
{
pLink:"visit_control", // 子页面部分链接
          link:{id:"1", tl:"访问控制"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              /*段落*/
              {p
                  :'在设备中配置访问控制策略，可以监测流经设备的每个数据包。默认情况下，设备中没有配置任何访问控制策略，设备将转发接收到的所有合法的数据包。如果配置了访问控制策略，当数据包到达设备后，它会取出此数据包的源MAC地址、源地址、目的地址、上层协议、端口号或数据包中的内容进行分析，并按照策略表中的顺序从上至下进行匹配，查看是否有匹配的策略，并执行匹配到的第一个策略所定义的动作：转发或丢弃。并且不再继续比较其余的策略。可以通过设置“过滤类型”指定访问控制策略的过滤类型，设备提供四种过滤类型：IP过滤、URL过滤、关键字过滤以及DNS过滤。'},
       
       /*标题*/
              {t1 :'IP过滤'},
       /*段落*/
              {p
                  :'IP过滤指对数据包的包头信息过滤，例如源地址和目的IP地址。如果IP头中的协议字段封装协议为TCP或UDP，则再根据TCP头信息（源端口和目的端口）或UDP头信息（源端口和目的端口）执行过滤。过滤类型为IP过滤时，可供设置的过滤条件包括：源地址(适用用户）、目的IP地址、协议、源端口、目的端口、动作和生效时间等。'},
              
              {t1 :'URL过滤'},
{p                  :'URL过滤指对URL网址过滤，根据URL中的关键字进行过滤，不仅可以控制内网用户对站点的访问，还可以控制用户对网页的访问。过滤类型为URL过滤时，可供设置的过滤条件包括：源地址（适用用户）、过滤内容（指URL地址）、动作和生效时间等。'},
               {t1 :'关键字过滤'},
{p                  :'关键字过滤指对HTML页面（网页）中的关键字过滤，它的意思是如果你在某个网页里发表了包含了定义的关键字（如色情、反动、赌博等）的言论，将会提交不成功。过滤类型为关键字过滤时，可供设置的过滤条件有：源地址（适用用户）、过滤内容（指网页中的关键字）和生效时间等。'},
               {t1 :'DNS过滤'},
{p                  :'DNS过滤指对域名进行过滤，根据域名名称中的关键字进行DNS过滤。过滤类型为DNS过滤时，可供设置的过滤条件包括：源地址（适用用户）、过滤内容（指需要过滤的域名名称）、动作、生效时段。'},
{ss :'提示：DNS过滤是通过53端口实现过滤，URL过滤是通过80端口实现过滤。'},
{p:
'访问控制策略的动作包括转发和丢弃，对应的“动作”分别为“允许”或“禁止”。当需要处理的数据包与某条已定义的访问控制策略相匹配时，如果该策略的“动作”是“允许”，那么设备将转发该数据包。如果该策略的“动作”是“禁止”，那么设备将丢弃该数据包。需要注意的是，关键字过滤由于其特殊的应用性，并不提供“动作”的选择，而是默认“禁止”。'},
              ]
}
,
{
pLink:"connect_control", // 子页面部分链接
          link:{id:"1", tl:"连接控制"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
                     /*表格*/
              {p  :
                  [
                  ['选项','描述'],
                  ['状态','开启或关闭连接数控制功能'],
                  ['总连接数','允许内网每台主机建立的最大总连接数。'],
                  ['TCP连接数','允许内网每台主机建立的最大TCP连接数。'],
                  ['UDP连接数','允许内网每台主机建立的最大UDP连接数。'],
                  ['ICMP连接数','允许内网每台主机建立的最大ICMP连接数。'],
                ]
              },
              ]
}
,
{
pLink:"attack_proection", // 子页面部分链接
          link:{id:"1", tl:"攻击防护"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              /*标题*/
                    /*短文字*/
               
               {p  :
                  [
                  ['选项','描述'],
                  ['启用DDoS攻击防御','启用后能有效防御内网常见的DDOS攻击。'],
                  ['启用IP欺骗防御','启用后能有效防御内网的IP欺骗现象。'],
                  ['启用UDP FLOOD防御','启用后能有效防御内网UDP FLOOD攻击。'],
                  ['启用ICMP FLOOD防御','启用后能有效防御内网ICMP FLOOD攻击。'],
                  ['启用SYN FLOOD防御','启用后能有效防御内网SYN FLOOD攻击。'],
                  ['启用ARP欺骗防御','启用后，设备的LAN口每隔一定的时间（默认为100毫秒）发送ARP广播包，能有效防御ARP欺骗'],
                  ['启用端口扫描防御','启用后能有效防御内网端口扫描。'],
                  ['拒绝外部Ping','拒绝外部Ping'],
                ]
              },

              ]
}
,
{
pLink:"IPSec", // 子页面部分链接
          link:{id:"1", tl:"IPsec"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              /*段落*/
              {p
                  :'IPSec支持的三种连接方式，分别为：网关到网关、动态连接到网关、对方动态连接到本地。当IPSec隧道一端是动态IP接入（未申请DDNS）时，隧道两端需使用“动态连接到网关”、“对方动态连接到本地”的连接方式。其中动态IP接入的一端选用“动态连接到网关”接入方式，作为发起方，另一端则选用“对方动态连接到本地”接入方式，做为响应方'},

              /*标题*/
              {t1 :'网关到网关'},

              {p  :['连接方式','选择“网关到网关”']},
              {p  :['隧道名称','配置隧道的名称']},
              {t2 :'远端设置'},
              {p  :['网关地址（域名）','IPSec隧道远端网关的地址（或域名），设置为域名时，需要在设备上设置DNS服务器，此时设备会定期解析该域名，如果IP地址发生变化，设备将重新协商IPSec隧道']},
              {p  :['远端内网地址','IPSec隧道远端受保护的内网的任一IP地址，如果远端是移动单机用户，则填写该设备的IP地址']},
              {p  :['远端内网子网掩码','IPSec隧道远端受保护的内网的子网掩码，如果远端是移动单机用户，则填写255.255.255.255']},
              
              {t2 :'本地设置'},
              {p  :['本地绑定','选择本地接口的类型，接口可以是以太网口或PPPoE拨号接口。如果将IPSec隧道配置为绑定到该接口上，那么所有经过该接口的数据包将通过IPSec检查，以确定是否对该数据包进行加密和解密操作']},
              {p  :['本地内网地址','本地受保护的内网的任一IP地址']},
              {p  :['本地内网掩码','本地受保护内网的子网掩码']},
              
              {t2 :'安全选项'},
              {p:'预共享密钥: 协商所用的预共享密钥，最长为98个字符。'},
              {p:'加密认证算法: 可供第二阶段协商使用的首选加密认证算法。'},
              {t2 :'高级选项'},
               
              {t3 :'第一阶段'},
              {p  :['协商模式','设置第一阶段的协商模式，可选项有主模式和野蛮模式。当连接方式选择网关到网关时，请选择主模式。当连接方式为动态连接到网关、对方动态连接到本地时，请选择野蛮模式']},
              {p  :['生存时间（秒）','设置IKE SA的生存时间，至少600秒，当剩余时间为540秒时，将重新协商IKE SA']},
              {p  :['加密认证算法1~4','设置第一阶段协商使用的加密认证算法，可以选择四组，每组为不同的加密算法、认证算法及DH组的组合']},

              
              {t3 :'第二阶段'},
              {p  :['加密认证算法1~4','设置第二阶段协商使用的加密认证算法，可选三组，加上在基本参数配置中已配置的一组，共四组']},
              {p  :['生存时间（秒）','设置IPSec SA的生存时间，至少600秒，当剩余时间为540秒时，SA将过期，重新协商IPSec SA']},


              {t3 :'其它'},
              
              {p  :['抗重播','设置是否启用抗重播。启用后，网关将支持抗重播功能，从而可以拒绝接收过的数据包或数据包拷贝，以保护自己不被攻击']},
              {p  :['DPD','设置是否启用DPD。启用后，在SA的生存时间内，设备定期发送心跳包检测对方网络是否可达，程序是否正常，如果连续丢失多个心跳包，则IPSecDPD会强制重新发起SA协商']},
              {p  :['NAT穿透','启用或取消NAT穿透功能']},
              {p  :['心跳（秒）','设置发送心跳包的时间间隔，默认值为20秒。配置该值后，网关会每隔单位时间（“心跳”）向对发送探测消息，来确定对端是否还存活']},
              {p  :['端口','设置NAT穿透时UDP封装包的端口号。']},
              
              {p  :['维持（秒）','启用NAT穿透功能后，设备将每隔单位时间（“维持”）向NAT设备发送一个数据包以维持NAT映射，这样就不需要更改NAT映射，直到第一阶段和第二阶段的SA过期。']},
              
              {t1 :'动态连接到网关'},
              {p:'“动态连接到网关”连接方式的部分参数配置同“网关到网关”连接方式，这里不再一一介绍。'},

              {p  :['连接方式','选择“动态连接到网关”。在这种情况下，在建立IPSec隧道时本设备只能作为发起方，且IPSec隧道两端都应该选择野蛮模式进行第一阶段的IKE协商']},
        
              {t2 :'远端设置'},
             
              {p  :['身份ID','设置用于认证远端的身份ID']},
              {p  :['用户类型','远端身份ID的类型，有Email地址、域名及IP地址三个选项']},
             {t2 :'本地设置'}, 
              
              {p  :['身份ID','本地发送给远端认证的身份ID']},
              {p  :['用户类型','本地身份ID的类型，有Email地址、域名及IP地址三个选项']},
              
             
              
              {t1 :'对方动态连接到本地'},
                    /*段落*/
              {p
                  :'对方动态连接到本地的参数配置同“动态连接到网关”。选择“对方动态连接到本地”时，远端的网关地址（域名）无需配置。在这种情况下，在建立IPSec隧道时本设备只能作为响应方，且IPSec隧道两端都应该选择野蛮模式进行第一阶段的IKE协商。'},

             
              
              ]
}
,
{
pLink:"L2TP", // 子页面部分链接
                  
 link:{id:"3", tl:"L2TP服务器全局设置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              {t1 :'L2TP全局设置'},
                {p  :
                  [
                  ['选项','描述'],
                  ['状态','开启或关闭L2TP功能。默认为关闭。'],
                  ['密码验证方式','建立L2TP VPN的密码验证方式，选项有EITHER（自动和对端设备协商密码验证方式）、PAP、CHAP、NONE。'],
                  ['地址池起始地址','配置L2TP服务器为L2TP客户端分配的起始IP地址，要确保该地址所属网段与局域网中的任何一个网段不重复。'],
                  ['最大连接数','配置隧道地址池包含的IP地址总数量。'],
                    ['服务端IP地址','隧道服务端的虚接口IP地址，该地址不包含在地址池中，请确认该地址与所配置的地址池在同一网段。'],
                  ['主、备DNS服务器','配置主DNS服务器的IP地址。当设备被配置为L2TP服务端时，可以为L2TP客户端分配DNS地址，其用于客户端连上服务端之后可以通过服务端线路分配的DNS地址浏览网页，可解决用户拨通VPN后可以访问服务器内部网却无法打开网页的问题。'],
                  

                ]
              },
              
]

}
,
{
pLink:"L2TP", // 子页面部分链接
          link:{id:"1", tl:"隧道列表"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              /*标题*/
              {t1 :'配置PPTP服务端'},
                
              {p  :'路由器作为PPTP服务器，在PPTP服务器上配置PPTP用户账号供用户建立PPTP隧道使用。'},
              {p  :
                  [
                  ['选项','描述'],
                  ['工作模式','选择“服务端（拨入）”。'],
                  ['协议类型','选择“PPTP”。'],
                  ['隧道名称','自定义该条隧道的名称，不能重复。'],
                  ['用户类型','选择用户类型，可选项为“LAN到LAN”或“移动用户”。\n移动用户：拨入的VPN用户是个人用户，往往由单个计算机拨入，实现PPTP隧道远端计算机与本地局域网的通信。\nLAN到LAN：拨入的PPTP/L2TP用户是一个网段的用户，往往是通过一个路由器拨入，实现PPTP隧道两端局域网的通信。'],
                  ['用户名、密码','自定义客户端拨号时使用的用户名和密码。'],
                 
                    ['远端内网地址','仅适用于“LAN到LAN”用户。配置PPTP隧道对端局域网所使用的IP地址（一般可以填VPN隧道对端设备的LAN口IP地址）。'],
                  ['远端内网子网掩码','仅适用于“LAN到LAN”用户。配置PPTP隧道对端局域网所使用的子网掩码。'],
                    ['固定IP地址','配置PPTP服务器分配给客户端的IP地址，该地址必须从属于PPTP服务器地址池中。'],
                  ['硬件特征码','仅适用于“移动用户”。配置PPTP移动用户的MAC地址。'],

                ]
              },
                {t1 :'配置PPTP客户端'},
                
              {p  :'路由器作为PPTP隧道的客户端，发起建立PPTP隧道。'},
              {p  :
                  [
                  ['选项','描述'],
                  ['工作模式','选择“客户端（拨出）”。'],
                  ['协议类型','选择“PPTP”。'],
                  ['NAT模式','启用NAT后，PPTP客户端会对此PPTP隧道连接进行NAT，即将局域网用户的IP地址转化为对端PPTP服务器分配的IP地址，这样局域网用户将使用PPTP服务器分配的IP地址连接到隧道对端的局域网，隧道对端设备无需设置到本地的路由。'],
                  ['隧道名称','该条隧道的名称，与设备中已有的实例名不能重复。'],
                  ['隧道服务器地址','远端VPN网关WAN口的IP地址或者域名（一般填PPTP隧道对端设备的WAN口IP地址或者域名）。'],
                  ['用户名、密码','该条隧道拨号时使用的用户名、密码。'],
                    
                  ['密码验证方式','设置建立PPTP VPN的密码验证方式，选项有MS-CHAPV2、PAP、CHAP、ANY（自动和对端设备协商密码验证方式）。密码验证方式要确保与服务端的一致。'],
                    ['远端内网地址','远端内网的IP地址，可填写远端VPN网关的LAN口IP地址。'],
                  ['远端内网子网掩码','远端内网的子网掩码。'],

                  ['MTU','最大传输单元。在传送数据单元时，设备将自动与对端设备协商最佳的传送数据单元大小，除非特别应用，不要修改此参数。'],
                ]
              },
  {t1 :'配置L2TP服务端'},
                
              {p  :'路由器作为L2TP服务器，在L2TP服务器上配置L2TP用户账号供用户建立L2TP隧道使用。'},
              {p  :
                  [
                  ['选项','描述'],
                  ['工作模式','选择“服务端（拨入）”。'],
                  ['协议类型','选择“L2TP”。'],
                  ['隧道名称','自定义该条隧道的名称，不能重复。'],
                  ['用户类型','选择用户类型，可选项为“LAN到LAN”或“移动用户”。\n移动用户：拨入的VPN用户是个人用户，往往由单个计算机拨入，实现L2TP隧道远端计算机与本地局域网的通信。\nLAN到LAN：拨入的L2TP用户是一个网段的用户，往往是通过一个路由器拨入，实现L2TP隧道两端局域网的通信。'],
                  ['用户名、密码','自定义客户端拨号时使用的用户名、密码。'],
               
                    ['远端内网地址','仅适用于“LAN到LAN”用户。配置L2TP隧道对端局域网所使用的IP地址（一般可以填VPN隧道对端设备的LAN口IP地址）。'],
                  ['远端内网子网掩码','仅适用于“LAN到LAN”用户。配置L2TP隧道对端局域网所使用的子网掩码。'],

                ]
              },
 {t1 :'配置L2TP客户端'},
                
              {p  :'路由器作为L2TP隧道的客户端，发起建立L2TP隧道。'},
              {p  :
                  [
                  ['选项','描述'],
                  ['工作模式','选择“客户端（拨出）”。'],
                  ['协议类型','选择“L2TP”。'],
                  ['隧道名称','该条隧道的名称，与设备中已有的实例名不能重复。'],
                  ['隧道服务器地址','L2TP服务器的IP地址或者域名（一般填L2TP隧道对端设备的WAN口IP地址或者域名）'],
                  ['用户名、密码','该条隧道拨号时使用的用户名、密码。'],
                  ['密码','该条隧道拨号时用的密码。'],
                    ['密码验证方式','本地客户端将使用L2TP协议和对端服务器协商创建L2TP隧道时需要验证密码的方式。'],
                  ['远端内网地址','L2TP隧道对端局域网所使用的IP地址段，可填写L2TP隧道对端设备的LAN口IP地址。'],

                  ['远端内网子网掩码','L2TP隧道对端局域网所使用的子网掩码。'],
                ]
              },
 
              ]
 
              

}
,
{
pLink:"L2TP", // 子页面部分链接
            link:{id:"2", tl:"PPTP服务器全局设置"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
              {t1 :'PPTP全局设置'},
                {p  :
                  [
                  ['选项','描述'],
                  ['状态','开启或关闭PPTP功能。'],
                  ['隧道加密','开启或关闭隧道加密功能。'],
                  ['密码验证方式','建立PPTP VPN的密码验证方式，选项有ANY（自动和对端设备协商密码验证方式）、PAP、CHAP、MS-CHAPV2。'],
                  ['地址池起始地址','PPTP服务器分配给PPTP客户端的起始IP地址，要确保该地址所属网段与局域网中的任何一个网段不重复。'],
                  
                  ['最大连接数','地址池包含的IP地址总数量。'],
                    ['服务端IP地址','隧道服务端的虚接口IP地址，该地址不包含在地址池中，请确认该地址与所配置的地址池在同一网段。'],
                  ['主、备DNS服务器','配置主DNS服务器的IP地址。              当设备被配置为PPTP服务端时，可以为PPTP客户端分配DNS地址，其用于客户端连上服务端之后可以通过服务端线路分配的DNS地址浏览网页，可解决用户拨通VPN后可以访问服务器内部网却无法打开网页的问题。'],
                  
                  ['MTU（字节）','最大传输单元。在传送数据单元时，设备将自动与对端设备协商最佳的传送数据单元大小，除非特别应用，不要修改此参数。'],

                ]
              },
              
              ]

}
,
{
pLink:"time_plan", // 子页面部分链接
          link:{id:"1", tl:"时间计划"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
             {p  :'制定时间计划，将多个不连续的时间段组成一个时间组，以方便对用户进行组管理。'},
                         ]
}
,
{
pLink:"addrGroup", // 子页面部分链接
          link:{id:"1", tl:"地址组"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
              content:[
             {p  :'配置IP地址组，将多个不连续的IP段组成一个地址组，便于其他程序引用。地址组可以多层叠加，深度不可大于2。'},
                         ]
}
,
{
pLink:"black_list", // 子页面部分链接
	  link:{id:"1", tl:"黑名单"}, // 当前文档的对应的 “标签页” 和 “标签页的名称”
	      content:[
	      /*标题*/

	      {p  :'查看与管理MAC黑名单用户。黑名单用户无法接入网络中。有效管理黑名单可以提高网络安全性和网络速率。例如将恶意攻击路由器的用户加入黑名单，可以提高网络安全。'},
          
          

  	      ]
}
,
	    ]
    });
