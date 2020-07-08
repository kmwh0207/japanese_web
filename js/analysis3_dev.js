var BIT = 1;
var BYTE= 2;
var payload_len;  //IP프레임일 경우 total length에서 페이로드 길이 얻어옴
var header_len;
var ICMP_type=0;

const format = {
    Ethernet:["Destination Address","Source Address","Type"],
    ARP:["H/W Type","Protocol Type","H/W Size","Protocol Size","Operation","Sender Mac Address","Sender IP Address","Target Mac Address","Target IP Address"],
    IP:["Version","Header Length","Service Type","Total length","Identification","Flags","Fragmentation offset","Time-to-live","Protocol","Header checksum","Source IP Address","Destination IP Address","Option"],
    ICMP:["Type","Code","Checksum","Identifier","Sequence number","Data section"],
    UDP:["Source port number","Destination port number","Total length","Checksum"],
    TCP:["Source port address","Destination port address","Sequence number","Acknowledgement number","Header Length(Data offset)","Reserved","Control Bits","Window Size","Checksum","Urgent pointer","Option"]
};

const format_length ={
    Ethernet:[6,6,2],
    ARP:[2,2,1,1,2,6,4,6,4],
    IP:[4,4,8,16,16,3,13,8,8,16,32,32,undefined],
    ICMP:[1,1,2,2,2,undefined],
    UDP:[2,2,2,2],
    TCP:[16,16,32,32,4,6,6,16,16,16,undefined]
};

const length_type ={
    Ethernet: BYTE,
    ARP: BYTE,
    IP: BIT,
    ICMP: BYTE,
    UDP: BYTE,
    TCP:BIT
}

const content={
    Ethernet:{
        "Destination Address":function(e){
            switch(e.substr(0,1)){
                case "0":
                    if(parseInt(e)==0) return "unknown MAC"
                    return "Unicast";
                case "1":
                    return "Multicast";
                case "f":
                    return "Broadcast";
            }
        },
        "Source Address":function(e){
            switch(e.substr(0,1)){
                case "0":
                    if(parseInt(e)==0) return "unknown MAC"
                    return "Unicast";
                case "1":
                    return "Multicast";
                case "f":
                    return "Broadcast";
            }
        },
        "Type":function(e){
            switch(e){
                case "0806":
                    return "ARP";
                case "0800":
                    return "IP";
            }
        }
    },
    ARP:{
        "H/W Type": function(e){
            switch(e){
                case "0001":
                    return "Ethernet";
            }
        },
        "Protocol Type":function(e){
            switch(e){
                case "0806":
                    return "ARP";
                case "0800":
                    return "IP";
            }
        },
        "H/W Size":function(e){return parseInt(e,16)*8+"bits"},
        "Protocol Size":function(e){return parseInt(e,16)*8+"bits"},
        "Operation":function(e){
            switch(e){
                case "0001":
                    return "ARP request";
                case "0002":
                    return "ARP Reply";
                case "0003":
                    return "RAPP Request";
                case "0004":
                    return "RAPP Reply";
            }
        },
        "Sender Mac Address":function(e){
            switch(e.substr(0,1)){
                case "0":
                    if(parseInt(e)==0) return "unknown MAC"
                    return "Unicast";
                case "1":
                    return "Multicast";
                case "f":
                    return "Broadcast";
            }
        },
        "Sender IP Address":function(e){return hexToIp(e)},
        "Target Mac Address":function(e){
            switch(e.substr(0,1)){
            case "0":
                if(parseInt(e)==0) return "unknown MAC"
                return "Unicast";
            case "1":
                return "Multicast";
            case "f":
                return "Broadcast";
            }
        },
        "Target IP Address":function(e){return hexToIp(e)}
    },
    IP:{
        "Version":function(e){ 
            switch(e){
                case "0100":
                    return "IPv4";
                case "0110":
                    return "IPv6";
            }
        },
        "Header Length":function(e){
            var length_ = parseInt(e,2)*4
            var option_len = format_length["IP"][format_length["IP"].length-1];
            if(option_len == 0) option_len="No_option"
            return length_+" bytes"+ ", Option_length: "+option_len;
        },
        "Service Type":function(e){
            var result="";
            var field1 = {"000":"Routine","001":"Priority","010":"Immediate","011":"Flash","100":"Flash override","101":"Critical","110":"Internetwork Control","111":"Network Control"}
            var field2 = {"1000":"Delay","0100":"Throughput","0010":"Reliability","0001":"Minimum cost"}
            var temp=parseInt(e.substr(0,3),2);
            for(var i in field1){
                if((parseInt(i,2)&temp)>0) result+=field[i]+" ";
            }
            temp=parseInt(e.substr(3,4),2);
            for(var i in field2){
                if((parseInt(i,2)&temp)>0) result+=field[i]+" ";
            }
            if(result=="") return "No Service Type";
            return result;
        },
        "Total length":function(e){
            var length_ = parseInt(e,2);
            payload_len = length_-header_len;
            return length_+" bytes  ,"+payload_len+"Bytes Payload ";
        },
        "Identification":function(e){return parseInt(e,2)},
        "Flags":function(e){
            return "Reserve:"+ (parseInt(e,2)&4?1:0) + " \nDon’t Fragment:" + (parseInt(e,2)&2?1:0) + " \nMore:" + (parseInt(e,2)&1?1:0);
        },
        "Fragmentation offset":function(e){
            var temp= parseInt(e,2).toString(16);
            return temp>0? temp:"first offset";
        },
        "Time-to-live":function(e){return parseInt(e,2)+"hops";},
        "Protocol":function(e){
            switch(e){
                case "00000001":
                    return "ICMP";
                case "00000110":
                    return "TCP";
                case "00010001":
                    return "UDP";
            }
        },
        "Header checksum":function(e){return e;},
        "Source IP Address":function(e){return hexToIp(parseInt(e,2).toString(16))}, //!!TODO 나중에 고칠것. 16진수->2진수->16진수 루트로 연산낭비
        "Destination IP Address":function(e){return hexToIp(parseInt(e,2).toString(16))},//!!나중에 고칠것. 16진수->2진수->16진수 루트로 연산낭비
        "Option":function(e){} //미구현 세부내용은 https://en.wikipedia.org/wiki/IPv4
    },
    ICMP:{
        "Type":function(e){
            console.log("!!!!!!!"+e);
            var temp = parseInt(e,16);
            console.log("!!!!!!!"+temp);
            ICMP_type=temp;
            switch(temp){
                case 0:
                    return "Echo reply";
                case 3:
                    return "Destination unreachable";
                case 4:
                    return "Source quench";
                case 5:
                    return "Redirection";
                case 6:
                    return "Alternate Host Address";
                case 8:
                    return "Echo request";
                case 9:
                    return "Router Advertisement";
                case 10:
                    return "Router Selection";
                case 11:
                    return "Time exceeded";
                case 12:
                    return "Parameter problem";
                case 13:
                    return "Timestamp request";
                case 14:
                    return "Timestamp reply";
                case 15:
                    return "Information Request";
                case 16:
                    return "Information Reply";
                case 17:
                    return "Address Request";
                case 18:
                    return "Address Reply";
            }
        },
        "Code":function(e){
            var temp = parseInt(e,16);
            if(ICMP_type==3) {
                switch(temp){
                    case 0:
                        return "Net Unreachable";
                    case 1:
                        return "Host Unreachable ";
                    case 2:
                        return "Protocol Unreachable";
                    case 3:
                        return "Port Unreachable  ";
                    case 4:
                        return "Fragmentation Needed and Don't Fragment was Set";
                    case 5:
                        return "Source Route Failed ";
                    case 6:
                        return "Destination Network Unknown";
                    case 7:
                        return "Destination Host Unknown";
                    case 8:
                        return "Source Host Isolated";
                    case 9:
                        return "Communication with Destination Network is Administratively Prohibited ";
                    case 10:
                        return "Communication with Destination Host is Administratively Prohibited";
                    case 11:
                        return "Destination Network Unreachable for Type of Service";
                    case 12:
                        return "Destination Host Unreachable for Type of Service";
                    case 13:
                        return "Communication Administratively Prohibited";
                    case 14:
                        return "Host Precedence Violation ";
                    case 15:
                        return "Precedence cutoff in effect ";
                }
            }else if(ICMP_type==5){
                switch(temp){
                    case 0:  
                        return "Redirect Datagram for the Network (or subnet)";
                    case 1:  
                        return "Redirect Datagram for the Host";
                    case 2:
                        return "Redirect Datagram for the Type of Service and Network";
                    case 3:
                        return "Redirect Datagram for the Type of Service and Host";
                }
            }else if(ICMP_type==9){
                switch(temp){
                    case 0:  
                        return "Normal router advertisement";
                    case 16:  
                        return "Does not route common traffic ";
                }
            }else if(ICMP_type=11){
                switch(temp){
                    case 0:  
                        return "Time to Live exceeded in Transit";
                    case 1:  
                        return "Fragment Reassembly Time Exceeded ";
                }
            }else if(ICMP_type=12){
                switch(temp){
                    case 0:  
                        return "Pointer indicates the error";
                    case 1:  
                        return "Missing a Required Option ";
                    case 2:
                        return "Bad Length";
                }
            }
            return undefined;
            //ICMP 관련 정보 참고. https://sostarzia.tistory.com/42
        },
        "Checksum":function(e){return parseInt(e,2).toString(16)},
        "Identifier":function(e){},
        "Sequence number":function(e){},
        "Rest of the header":function(e){},
        "Data section":function(e){
            return format_length["ICMP"][format_length["ICMP"].length-1]+"bytes";
        }
    },
    UDP:{
        "Source port number":function(e){
            var temp = parseInt(e,16);
            if(typeof ports[temp] === 'undefined') return "Client Port:Unknown Port";
            return ports[temp]["description"];
        },
        "Destination port number":function(e){
            var temp = parseInt(e,16);
            if(typeof ports[temp] === 'undefined') return "Client Port:Unknown Port";
            return ports[temp]["description"];
        },
        "Total length":function(e){
            return "Total Length" + parseInt(e,16);
        },
        "Checksum":function(e){}
    },
    TCP:{
        "Source port address":function(e){
            var temp = parseInt(e,2);
            if(typeof ports[temp] === 'undefined') return "Client Port:Unknown Port";
            return ports[temp]["description"];
        },
        "Destination port address":function(e){
            var temp = parseInt(e,2);
            if(typeof ports[temp] === 'undefined') return "Client Port:Unknown Port";
            return ports[temp]["description"];
        },
        "Sequence number":function(e){},
        "Acknowledgement number":function(e){},
        "Header Length(Data offset)":function(e){
            var length_ = parseInt(e,2)*4
            var option_len = format_length["TCP"][format_length["TCP"].length-1];
            return length_+" byte"+ ", Option_length: "+option_len;
        },
        "Reserved":function(e){},
        "Control Bits":function(e){
            var result="";
            var field = {"100000":"Urgent","010000":"Ack","001000":"Push","000100":"Reset","000010":"Syn","000001":"Fin"}
            var temp=parseInt(e,2);
            for(var i in field){
                if((parseInt(i,2)&temp)>0) result+=field[i]+" :1\n";
                else result+=field[i]+" :0\n";
            }
            return result;
        },
        "Window Size":function(e){
            return parseInt(e,2)+"bytes";
        },
        "Checksum":function(e){},
        "Urgent pointer":function(e){
            return parseInt(e,2)==0? "Not Urgent ":parseInt(e,2);
        },
        "Option":function(e){
            return format_length["TCP"][format_length["TCP"].length-1]/8+"bytes";
        }
    }
}

function reset() {
}

window.onload = function () {
    document.getElementsByTagName('button')[0].addEventListener('click', start);
}

function start(){
    var calc = new Calc();
    calc.getValue("Ethernet");
    //연산 나열
    calc.calcContent("Ethernet");
    printNewLine("Ethernet",format.Ethernet,calc.frame,convert(calc.frame,0,calc.frame.length,2,16,length_type["Ethernet"]),calc.content_text);
    calc.frame_format.push(calc.content_text.pop()); //다음에 연산할 프레임
    calc.reset(); //프레임들 초기화

    if(calc.frame_format.slice(-1)[0]=="ARP"){
        calc.getValue("ARP");
        calc.calcContent("ARP");
        printNewLine("ARP",format.ARP,calc.frame,convert(calc.frame,0,calc.frame.length,2,16,length_type["ARP"]),calc.content_text);
        calc.reset(); //프레임들 초기화

    }else if(calc.frame_format.slice(-1)[0]=="IP"){
        calc.getValue("IP");

        //ip 옵션 프레임 
        header_len = parseInt(calc.frame[format["IP"].indexOf("Header Length")],2)*4;
        format_length["IP"][format_length["IP"].length-1] = header_len-20;
        calc.frame[calc.frame.length-1] = calc.cutString(length_type["IP"],format_length["IP"][format_length["IP"].length-1]);

        calc.calcContent("IP");
        calc.frame_format.push(calc.content_text[8]); //ip 설명의 8번째 갖고옴
        printNewLine("IP",format.IP,calc.frame,convert(calc.frame,0,calc.frame.length,2,16,length_type["IP"]),calc.content_text);
        console.log("!!!!test log frame:",calc.frame);
        calc.reset(); //프레임들 초기화
        if(calc.frame_format.slice(-1)[0]=="ICMP"){
            calc.getValue("ICMP");

            //ICMP 데이터 프레임 
            format_length["ICMP"][format_length["ICMP"].length-1]=payload_len-8;
            calc.frame[calc.frame.length-1] = calc.cutString(length_type["ICMP"],format_length["ICMP"][format_length["ICMP"].length-1]);
            //Error / Query 프레임 수정
            var icmp_temp=parseInt(calc.frame[format["ICMP"].indexOf("Type")],16);
            if(icmp_temp == 3 || icmp_temp == 4 || icmp_temp == 5 || icmp_temp == 11 || icmp_temp == 12){
                format_length["ICMP"][format_length["ICMP"].length-3]=4;
                format_length["ICMP"][format_length["ICMP"].length-2]=0;
                format["ICMP"][format_length["ICMP"].length-3]="Rest of the header";
                format["ICMP"][format_length["ICMP"].length-2]="";
            }

            calc.calcContent("ICMP");
            printNewLine("ICMP",format.ICMP,calc.frame,convert(calc.frame,0,calc.frame.length,2,16,length_type["ICMP"]),calc.content_text);

        }else if(calc.frame_format.slice(-1)[0]=="TCP"){
            calc.getValue("TCP");

            //tcp 옵션 프레임 
            format_length["TCP"][format_length["TCP"].length-1]=(parseInt(calc.frame[format["TCP"].indexOf("Header Length(Data offset)")],2)*4-20)*8;
            calc.frame[calc.frame.length-1] = calc.cutString(length_type["TCP"],format_length["TCP"][format_length["TCP"].length-1]);
            console.log('!!!중요!!!!!! calc.frame[calc.frame.length-1] : ', calc.frame[calc.frame.length-1] );

            calc.calcContent("TCP");
            printNewLine("TCP",format.TCP,calc.frame,convert(calc.frame,0,calc.frame.length,2,16,length_type["TCP"]),calc.content_text);

        }else if(calc.frame_format.slice(-1)[0]=="UDP"){
            calc.getValue("UDP");
            calc.calcContent("UDP");
            printNewLine("UDP",format.UDP,calc.frame,convert(calc.frame,0,calc.frame.length,2,16,length_type["UDP"]),calc.content_text);

        }
    }
    
}

Calc.prototype.calcContentByte = function(where,num){
    console.log('this.frame_16[num]: ', this.frame_16[num]);
    this.content_text[num]=content[where][format[where][num]](this.frame_16[num]);
    
    console.log("content 값"+this.content_text[num]);
}
Calc.prototype.calcContentBit = function(where,num){
    console.log('this.frame[num]: ', this.frame[num]);
    this.content_text[num]=content[where][format[where][num]](this.frame[num]);
    
    console.log("content 값"+this.content_text[num]);
}

Calc.prototype.calcContent = function(type){
    if(length_type[type]==BYTE){
        for(var i in format[type]){
            this.calcContentByte(type,i);
        }
    }else if(length_type[type]==BIT){
        for(var i in format[type]){
            this.calcContentBit(type,i);
        }
    }
}

function compare(text1,text2,where,to){
    return text1.substr(where,1).search(text2);
}

function hexToIp(text){
    var temp=[];
    for(var i=0; i<text.length; i=i+2){
        temp.push(parseInt(text.substr(i,2),16))
    }
    return temp.join(".");
}

function Calc() {
    reset();
    this.count=0;
    this.temp_16 = document.getElementById('inputtext').value;
    this.text_temp=[];
    var count = 0;
    while(count<this.temp_16.length){
        var temp_ = parseInt(this.temp_16.substr(count,1),16).toString(2);
        temp_ = numToString(temp_,4);
        //temp_ = temp_.length >= 4 ? temp_ : new Array(4 - temp_.length+1).join('0') + temp_;
        this.text_temp.push(temp_);
        count++;
    }
    console.log('!!!!this.temp_16: ', this.temp_16);
    this.text_temp= this.text_temp.join('');
    console.log(this.text_temp);
    //this.text_temp = parseInt(this.text_temp, 16).toString(2);
    this.frame= []; //2진수 프레임
    this.frame_16=[]; //16진수 프레임
    this.frame_format=[];
    this.content_text=[];
    document.getElementsByTagName('button')[0].innerHTML = "초기화";
    document.getElementsByTagName('button')[0].removeEventListener('click', start);
    document.getElementsByTagName('button')[0].addEventListener('click', function () {
        location.reload();
    });
    console.log("print texttemp:" + this.text_temp);
}
Calc.prototype.reset = function(){
    this.frame=[]; //프레임 초기화
    this.frame_16=[]; //프레임 초기화
    this.content_text=[]; //설명 초기화
}

Calc.prototype.getValue = function(type){
    console.log('type: ', type);
    if(length_type[type]==BYTE){
        for(var i in format[type]){
            console.log('i: ', i);
            this.frame_16.push(this.temp_16.substr(0,format_length[type][i]*2));
            console.log('!!!!this.frame_16: ', this.frame_16);
            this.frame.push(this.cutString(length_type[type],format_length[type][i]));
            console.log('!!!!this.frame: ', this.frame);
        }
    }else{
        for(var i in format[type]){
            console.log('i: ', i);
            this.frame_16.push(0); //비트연산이 포함된 타입일경우 16진수로 넣지 못함..
            this.frame.push(this.cutString(length_type[type],format_length[type][i]));
        }
    } 
    this.frame_format.push(type);
}

Calc.prototype.cutString = function(type,size){
    if(size === undefined) return this.text_temp; //undefiend이면 그냥 끝까지 리턴
    if(type == BYTE) size = parseInt(size*8);
    else if(type == BIT) {
    }
    var temp = this.text_temp.substring(0,size);
    this.text_temp = this.text_temp.substring(size);
    this.temp_16 = this.temp_16.substring(Math.round(size/4));
    console.log(temp);
    return temp;
}

function numToString(text,str_length){
    console.log('str_length - text.length+1: ', str_length - text.length+1);
    text = text.length >= str_length ? text : new Array(str_length - text.length+1).join('0') + text;
    
    return text;
}

function convert(framelist,start_num,end_num,from_type,to_type,bit){  
    var temp_list=framelist.slice(start_num,end_num);//end_num은 포함안됨
    var return_list=[];
    /*for(var n of temp_list){
        return_list.push(convertRun(n,from_type,to_type));
    }*/
    temp_list.forEach( n => {
        return_list.push(convertRun(n,from_type,to_type,bit));
    });
    return return_list;
}

function convertRun(text,from_type,to_type,bit){
    var trans_length = Math.round(text.length/4); //비트연산으로 하면 소수점으로 나오니까 올림으로.
    console.log('trans_length: ', trans_length);
    if(trans_length>8){
        var result="";
        var temp_text;
        for(var i=0; i<trans_length; i++){
            temp_text=text.substr(i*4,4);
            result += numToString(parseInt(temp_text,from_type).toString(to_type),1);
        }
        return result;
    }else{
        return numToString(parseInt(text,from_type).toString(to_type),trans_length);
    }
}

function printNewLine(){ //배열 여러개 넘김, 새로운 테이블 출력
    var text=[];
    var table_name = arguments[0]; //1번째 인자는 테이블이름
    Array.prototype.splice.call(arguments,0,1); 
    text = Array.from(arguments); //나머지 인자는 리스트들
    console.log('text: ', text);

    var mytable = document.createElement('div');
    mytable.className="field";
    mytable.innerHTML=`<table>
        <caption class="caption_">${table_name}</caption>
        <tbody class="tbody_"></tbody>
        </table>`;
    document.body.appendChild(mytable);
    mytable = null;
    mytable = document.body.children[document.body.childElementCount-1].getElementsByClassName("tbody_")[0]
    for(var n in text[0]){
        var row = mytable.insertRow(n);
        for(var i in text){
            if(text[i][n]===undefined || text[i][n]=== "NaN") text[i][n]=" ";
            row.insertCell(i).innerHTML="<td>"+text[i][n]+"</td>";
        }
        console.log('insertCell: ', n);
    }
}