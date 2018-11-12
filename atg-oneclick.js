angular.module('myApp', ['ngClipboard']).controller('userCtrl', ['$scope','$window','ngClipboard','$http', function($scope, $window, ngClipboard,$http) {
$scope.personas = '';
$scope.environments = '';
$scope.linkType = '';
$scope.envId='';
$scope.persId='';
$scope.postString='';
$scope.port=0;
$scope.finalLink = "";
$scope.onPrem = "";
$scope.bqdiygenericlink = "-storefront.diy.com/";
$scope.frdiygenericlink = "-storefront.castorama.fr/";
$scope.bqawsdiygenericlink = "-storefront.ecommnp.kd.kfplc.com/";
$scope.frawsdiygenericlink = "-storefront.ecommnp.kd.kfplc.com/";

$scope.bqagentgenericlink = "-agent.uk.b-and-q.com/agent-front/";
$scope.fragentgenericlink = "-agent.castorama.fr/agent-front/";
$scope.bqawsagentgenericlink = "-afa.ecommnp.kd.kfplc.com/agent-front/";
$scope.frawsagentgenericlink = "-afa.ecommnp.kd.kfplc.com/agent-front/";

$scope.puttytext = true ;
$scope.puttyuserId = "" ;
$scope.repos = true;


/*
http://atg-uatx-ndc-fft01.uk.b-and-q.com:8040/dyn/admin/nucleus//atg/commerce/order/OrderRepository/
http://atg-uatx-ndc-fft01.uk.b-and-q.com:8040/dyn/admin/nucleus//atg/userprofiling/ProfileAdapterRepository/
http://atg-uatx-ndc-fft01.uk.b-and-q.com:8040/dyn/admin/nucleus//atg/commerce/inventory/InventoryRepository/
http://atg-uatx-ndc-fft01.uk.b-and-q.com:8040/dyn/admin/nucleus//atg/registry/ContentRepositories/ProductCatalog/
http://atg-uatx-ndc-fft01.uk.b-and-q.com:8040/dyn/admin/nucleus//kf/repository/KFRepository/
http://atg-uatx-ndc-aux01.uk.b-and-q.com:8050/dyn/admin/nucleus/atg/commerce/pricing/priceLists/PriceLists/
http://atg-uatx-ndc-fft01.uk.b-and-q.com:8040/dyn/admin/nucleus//atg/commerce/custsvc/CsrRepository/
Onprem BQ Jenkins	http://lnxs0588.uk.b-and-q.com:8080/jenkins/
CAFRPVT Jenkins	http://lnxs1250.ghanp.kfplc.com:8080/
OnPrem Endeca Jenkins	http://jenkins-onprem-endeca-master.aws.ghanp.kfplc.com:8080/
Ecomm Master	 http://jenkins-ecomm-master.aws.ghanp.kfplc.com:8080/
*/
$scope.repositories = [
{reposit_name:"Order Repository", reposit_link:"",reposit_tail:"/dyn/admin/nucleus//atg/commerce/order/OrderRepository/"},
{reposit_name:"Profile Repository", reposit_link:"",reposit_tail:"/dyn/admin/nucleus//atg/userprofiling/ProfileAdapterRepository/"},
{reposit_name:"Inventory Repository", reposit_link:"",reposit_tail:"/dyn/admin/nucleus//atg/commerce/inventory/InventoryRepository/"},
{reposit_name:"Product Catalog", reposit_link:"",reposit_tail:"/dyn/admin/nucleus//atg/registry/ContentRepositories/ProductCatalog/"},
{reposit_name:"KF Repository", reposit_link:"",reposit_tail:"/dyn/admin/nucleus//kf/repository/KFRepository/"},
{reposit_name:"PriceLists Repository", reposit_link:"",reposit_tail:"/dyn/admin/nucleus/atg/commerce/pricing/priceLists/PriceLists/"},
{reposit_name:"Return Order (CSR) Repository", reposit_link:"",reposit_tail:"/dyn/admin/nucleus//atg/commerce/custsvc/CsrRepository/"}
];

$scope.jenkins_links = [
{jenkins_name:"Onprem BQ Jenkins", jenkins_link:"http://lnxs0588.uk.b-and-q.com:8080/jenkins/"},
{jenkins_name:"CAFRPVT Jenkins", jenkins_link:"http://lnxs1250.ghanp.kfplc.com:8080/"},
{jenkins_name:"OnPrem Endeca Jenkins", jenkins_link:"http://jenkins-onprem-endeca-master.aws.ghanp.kfplc.com:8080/"},
{jenkins_name:"Ecomm Master", jenkins_link:"http://jenkins-ecomm-master.aws.ghanp.kfplc.com:8080/"},
];

$scope.options = [
{id:1, personas:'Agent01', persId:'app01', port:8030  },
{id:2, personas:'Agent02', persId:'app02', port:8030  },
{id:3, personas:'storefront01', persId:'app01', port:8080 },
{id:4, personas:'storefront02',  persId:'app02', port:8080 },
{id:5, personas:'fulfillment',  persId:'fft01', port:8040  },
{id:6, personas:'publish', persId:'pub01', port:8070  },
{id:7, personas:'AuxStorefront', persId:'aux01', port:8050  },
{id:8, personas:'AuxAgent', persId:'aux02', port:8090  }
];

$scope.envs = [
{id:1, environments:"B&Q UATX", envId:"uatx", postString:".uk.b-and-q.com",opco:"BQ", aws:"N"},
{id:2, environments:"B&Q PVT" , envId:"pvt", postString:".uk.b-and-q.com",opco:"BQ", aws:"N"},
{id:3, environments:"B&Q PFT", envId:"pft", postString:".uk.b-and-q.com" ,opco:"BQ", aws:"N"},
{id:4, environments:"B&Q SIT", envId:"sit", postString:".uk.b-and-q.com" ,opco:"BQ", aws:"N"},
{id:5, environments:"Casto F(UATX)", envId:"sitcafr", postString:".aws.gha.kfplc.com",opco:"FR", aws:"Y"},
{id:6, environments:"Casto PFT" , envId:"frca-pft", postString:".ghanp.kfplc.com",opco:"FR", aws:"N"},
{id:7, environments:"Casto PVT" , envId:"frca-pvt", postString:".ghanp.kfplc.com",opco:"FR" , aws:"N"},
{id:8, environments:"B&Q H tier" , envId:"hftbquk", postString:".aws.gha.kfplc.com",opco:"BQ" , aws:"Y"},
{id:9, environments:"Casto H tier" , envId:"hftcafr", postString:".aws.gha.kfplc.com",opco:"FR" , aws:"Y"},
{id:9, environments:"Jenkins link" , envId:"Jenkins", postString:"",opco:"" , aws:""}
];

$scope.links = [
{id:1, linkType:"DynAdmin" },
{id:2, linkType:"PSO"},
{id:3, linkType:"AFA"},
{id:4, linkType:"BCC"},
{id:5, linkType:"JDBC Browser"},
{id:6, linkType:"SOAPMessageDispatcher"},
{id:7, linkType:"Generic link AFA/DIY"},
{id:8, linkType:"PuTTY"},
{id:9, linkType:"Repositories"}
];

/*$scope.myJson={};
$http.get('http://localhost:8080/mqstatus/webapi/mqstatus')
    .then(function(response) {
        $scope.myJson = response.data;
		
    });*/

$scope.prepareLink = function(id1, id2, id3) {
	
	$scope.persId = $scope.options[id2-1].persId ;
	$scope.puttytext = true ;
	$scope.repos = true;
	$scope.onPrem = "-ndc-" ;
	if ($scope.envs[id1-1].envId == "sitcafr" || $scope.envs[id1-1].envId == "hftbquk" || $scope.envs[id1-1].envId == "hftcafr" ) {
		
		if ($scope.options[id2-1].personas == 'Agent01'){
		   $scope.persId = 'afa01' ;}
		
		if ($scope.options[id2-1].personas == 'Agent02' ){
		   $scope.persId = 'afa02' ;}
		   
		if ($scope.options[id2-1].personas == 'fulfillment' ){
		   $scope.persId = 'ful01' ;}
		
		$scope.onPrem = "-aws-" ;
	}
	
	if ($scope.links[id3 - 1].linkType == "DynAdmin") {
		$scope.finalLink = "http://atg-"+$scope.envs[id1-1].envId+$scope.onPrem+$scope.persId+$scope.envs[id1-1].postString+":"+$scope.options[id2-1].port+"/dyn/admin";
		$window.open($scope.finalLink);
	}
	
	if ($scope.links[id3 - 1].linkType == "PSO") {
		$scope.finalLink = "http://atg-"+$scope.envs[id1-1].envId+$scope.onPrem+$scope.persId+$scope.envs[id1-1].postString+":"+$scope.options[id2-1].port+"/dyn/admin/nucleus//kf/commerce/order/PrintChangeSalesOrderService/";
		$window.open($scope.finalLink);
	}
	
	if ($scope.links[id3 - 1].linkType == "AFA") {
		$scope.finalLink = "http://atg-"+$scope.envs[id1-1].envId+$scope.onPrem+$scope.persId+$scope.envs[id1-1].postString+":"+$scope.options[id2-1].port+"/agent-front";
		$window.open($scope.finalLink);
	}
	
	if ($scope.links[id3 - 1].linkType == "BCC") {
		$scope.finalLink = "http://atg-"+$scope.envs[id1-1].envId+$scope.onPrem+"pub01"+$scope.envs[id1-1].postString+":"+8070+"/atg/bcc";
		$window.open($scope.finalLink);
	}
	
	if ($scope.links[id3 - 1].linkType == "JDBC Browser") {
		$scope.finalLink = "http://atg-"+$scope.envs[id1-1].envId+$scope.onPrem+$scope.persId+$scope.envs[id1-1].postString+":"+$scope.options[id2-1].port+"/dyn/admin/atg/dynamo/admin/en/jdbcbrowser/index.jhtml";
		$window.open($scope.finalLink);
	}
	
	if ($scope.links[id3 - 1].linkType == "SOAPMessageDispatcher") {
		$scope.finalLink = "http://atg-"+$scope.envs[id1-1].envId+$scope.onPrem+$scope.persId+$scope.envs[id1-1].postString+":"+$scope.options[id2-1].port+"/kf/kf-data-loader-ws/soapMessageDispatcher.jsp";
		$window.open($scope.finalLink);
	}
	
	if ($scope.links[id3 - 1].linkType == "Generic link AFA/DIY") {
		
		if ($scope.options[id2-1].personas == 'Agent01' || $scope.options[id2-1].personas == 'Agent02'){
			
			if ($scope.envs[id1-1].opco == "BQ"){
				
				$scope.finalLink = "https://"+$scope.envs[id1-1].envId+$scope.bqagentgenericlink;
				if ($scope.envs[id1-1].aws == "Y"){
					$scope.finalLink = "https://"+$scope.envs[id1-1].envId+$scope.bqawsagentgenericlink;
				}
			}
			if ($scope.envs[id1-1].opco == "FR"){
				$scope.finalLink = "https://"+$scope.envs[id1-1].envId.substring(5, 8)+$scope.fragentgenericlink;
				if ($scope.envs[id1-1].aws == "Y"){
					$scope.finalLink = "https://"+$scope.envs[id1-1].envId+$scope.frawsagentgenericlink;
				}
			}
			
		}
		
		if ($scope.options[id2-1].personas == 'storefront01' || $scope.options[id2-1].personas == 'storefront02'){
			
			if ($scope.envs[id1-1].opco == "BQ"){
				$scope.finalLink = "https://"+$scope.envs[id1-1].envId+$scope.bqdiygenericlink;
				if ($scope.envs[id1-1].aws == "Y"){
					$scope.finalLink = "https://"+$scope.envs[id1-1].envId+$scope.bqawsdiygenericlink;
				}
			}
			
			if ($scope.envs[id1-1].opco == "FR"){
				$scope.finalLink = "https://"+$scope.envs[id1-1].envId.substring(5, 8)+$scope.frdiygenericlink;
				if ($scope.envs[id1-1].aws == "Y"){
					$scope.finalLink = "https://"+$scope.envs[id1-1].envId+$scope.frawsdiygenericlink;
				}
			}
		}
		$window.open($scope.finalLink);
		
	}
	
	
	if ($scope.links[id3 - 1].linkType == "PuTTY") {
		
		if ($scope.envs[id1-1].aws == "N"){
			$scope.puttyuserId = "ukbqatgronp@" ;
		}
		
		/*if ($scope.envs[id1-1].aws == "Y"){
			$scope.puttyuserId = "sundek01@" ;
		}*/
		$scope.finalLink = "C:\\Program Files\\PuTTY\\putty.exe -ssh "+$scope.puttyuserId+"atg-"+$scope.envs[id1-1].envId+$scope.onPrem+$scope.persId+$scope.envs[id1-1].postString;
		ngClipboard.toClipboard($scope.finalLink);
		$scope.puttytext = false ;
		//source: https://github.com/nico-val/ngClipboard/blob/master/README.md
	}
	
	if ($scope.links[id3 - 1].linkType == "Repositories") {
	
		$scope.repos = false;
		for (var i=0;i<$scope.repositories.length;i++){
		$scope.repositories[i].reposit_link = "http://atg-"+$scope.envs[id1-1].envId+$scope.onPrem+$scope.persId+$scope.envs[id1-1].postString+":"+$scope.options[id2-1].port+$scope.repositories[i].reposit_tail;
		
		console.log($scope.repositories[i].reposit_link);
		}
		//https://stackoverflow.com/questions/38837963/angular-js-change-content-on-link
	}
		

};

}]);