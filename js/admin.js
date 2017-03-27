//angular 获取数据
var app=angular.module('app',[]);
app.controller('admin',function ($scope,$http,$interval) {
	$scope.d=true;
	$scope.bOk=true;
	$scope.addclass=function () {
	$scope.bOk=true;
	$scope.bOk1=false;
}
	$scope.addclass1=function () {
		$scope.bOk=false;
		$scope.bOk1=true;
	}
	//选项卡左右
	$scope.arr_celan=['用户管理','城市管理','首页广告','车库管理','论坛管理','车主故事','媒体报道'];
	$scope.now=0;
	$scope.bbb=$scope.arr_celan[0];
	$scope.getnow=function (i) {
		$scope.now=i
		$scope.bbb=$scope.bbb=$scope.arr_celan[i];
	}

	//添加管理员
	$scope.sign = function () {
		$http.get('/signup', {
			params: {
				user: $scope.t3,
				pass: $scope.t4,
				age: $scope.t5,
				sex: $scope.t6
			}
		}).success(function (data) {
			console.log(data)
			if (data.ok) {
				alert('注册成功')
				$scope.bOk1=false;
				getuser()
				$scope.t3='';
				$scope.t4='';
				$scope.t5='';
				$scope.t6='';

			} else {
				alert(data.msg)
			}
		})
	}
	//获取管理员信息
	function getuser() {
		$http.get('/user').success(function (data) {
			if (data.ok) {
				$scope.user_data=data.msg;
			} else {
				alert(data.msg)
			}
		})
	}
	getuser()
	//删除用户
	$scope.mask=function (id) {
		$scope.uesrid=id;
	}
	
	$scope.user_del = function () {
		$http.get('/user_del', {
			params: {
				id:$scope.uesrid
			}
		}).success(function (data) {
			if (data.ok) {
				alert(data.msg)
				getuser()
			} else {
				alert(data.msg)
			}
		})
	}
	
	//获取城市信息
	function getcity() {
		$http.get('/getcity').success(function (data) {
			if (data.ok) {
				$scope.city_data=data.msg;
			} else {
				alert(data.msg)
			}
		})
	}
	getcity()
	//添加城市
	$scope.add_city = function () {
		$http.get('/add_city', {
			params: {
				name: $scope.t7,
				shouzimu: $scope.t8,
				zhoubian: $scope.t9,
				cityhot: $scope.t10
			}
		}).success(function (data) {
			if (data.ok) {
				alert(data.msg)
				$scope.bOk1=false;
				getcity()
				$scope.t7='';
				$scope.t8='';
				$scope.t9='';
				$scope.t10='';

			} else {
				alert(data.msg)
			}
		})
	}
	//删除城市
	$scope.city_del = function () {
		$http.get('/city_del', {
			params: {
				id:$scope.uesrid
			}
		}).success(function (data) {
			if (data.ok) {
				alert(data.msg)
				getcity()
			} else {
				alert(data.msg)
			}
		})
	}
	//banner广告数据
	function  get_banner() {
		$http.get('/banner').success(function (data) {
			if (data.ok) {
				$scope.banner_data = data.msg;
			} else {
				alert(data.mas)
			}
		}).error(function () {
			alert('出错了')
		})
	}
	get_banner()
	//删除banner数据
	$scope.banner_del = function () {
		$http.get('/banner_del', {
			params: {
				id:$scope.uesrid
			}
		}).success(function (data) {
			if (data.ok) {
				alert(data.msg)
				get_banner()
			} else {
				alert(data.msg)
			}
		})
	}
	//添加banner数据
	$scope.add_banner = function () {
		$http.get('/add_banner', {
			params: {
				title: $scope.t11,
				src: $scope.t12,
				herf: $scope.t13,
				beijing: $scope.t14
			}
		}).success(function (data) {
			if (data.ok) {
				//alert($scope.t11)
				alert(data.msg)
				$scope.bOk1=false;
				get_banner()
				$scope.t11='';
				$scope.t12='';
				$scope.t13='';
				$scope.t14='';

			} else {
				alert(data.msg)
			}
		})
	}

})

app.filter('sex',function () {
	return function (input) {
		if(input==0){
			return '男'
		}else{
			return '女'
		}
	}
})

