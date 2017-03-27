//angular 获取数据
var app=angular.module('app',[]);
app.controller('test',function ($scope,$http,$interval) {
	$http.get('/getcity').success(function (data) {
		if (data.ok) {
			$scope.data = data.msg
			$scope.arr = []
			$scope.json = {}
			$scope.arrZB = []
			$scope.arrRM = []
			angular.forEach($scope.data, function (v, k) {
				$scope.json[v.shouzimu] = 0;
				if (v.zhoubian) {
					$scope.arrZB.push(v.name)
				}
				if (v.cityhot) {
					$scope.arrRM.push(v.name)
				}

			});

			angular.forEach($scope.json, function (v1, k1) {
				var arr1 = []
				angular.forEach($scope.data, function (v, k) {
					if (k1 == v.shouzimu) {
						arr1.push(v.name)
					}
				});
				$scope.arr.push({shouzimu: k1, name: arr1})
				arr1 = []
			})


		} else {
			alert(data.msg)
		}
	}).error(function () {
		alert('出错了')
	});
	//点击换到相应的城市
	$scope.city = '北京'

	$scope.getcity = function (i) {
		$scope.city = i
	}


	//banner数据的获取
	$http.get('/banner').success(function (data) {
		if (data.ok) {
			$scope.data = data.msg;
		} else {
			alert(data.mas)
		}
	}).error(function () {
		alert('出错了')
	})
	$scope.active = 0;
	var timer = null;

	function fntab(n) {
		timer = $interval(function () {
			n++
			if (n > 3) {
				n = 0
			}
			$scope.active = n;
		}, 1400)
		return $scope.active;
	}

	fntab($scope.active)
	$scope.tab = function (index) {
		$scope.active = index;

	}
	$scope.tab1 = function (index) {
		fntab($scope.active)
	}
	$scope.tab2 = function (index) {
		$interval.cancel(timer);
	}


	//更多品牌的数据
	$http.get('/brand').success(function (data) {
		if (data.ok) {
			$scope.brand = data.msg;
			$scope.arrBrand1 = [];
			$scope.arrBrand2 = [];
			$scope.arrBrandhot = [];
			$scope.jsonBrand = {}
			angular.forEach($scope.brand, function (v, k) {
				$scope.jsonBrand[v.shouzim] = 1;
				if (v.brandhot) {
					$scope.arrBrandhot.push(v.name)
				}
			})
			var n = 0
			angular.forEach($scope.jsonBrand, function (v1, k1) {
				var arrB = []
				angular.forEach($scope.brand, function (v, k) {
					if (k1 == v.shouzim) {
						arrB.push(v.name)
					}
				})
				n = n + 1
				if (n < 12) {
					$scope.arrBrand1.push({shouzim: k1, name: arrB});
				} else {
					$scope.arrBrand2.push({shouzim: k1, name: arrB});
				}
			})

		} else {
			alert(data.mas)
		}
	}).error(function () {
		alert(出错了)
	})
	//下拉

	$scope.xiala = function () {
		$http.get('/xiala', {
			params: {
				shou: $scope.t7
			}
		}).success(function (data) {
			$scope.xiala = data.msg
			$scope.arrBrand = [];
			if (data.ok) {
				angular.forEach($scope.xiala, function (v, k) {
					$scope.arrBrand.push(v.name)
				})

			} else {
				alert(data.msg)
			}
		})
	}

	//登录
	$scope.login = function () {

		$http.get('/login', {
			params: {
				user: $scope.t1,
				pass: $scope.t2
			}
		}).success(function (data) {
			if (data.ok) {
				alert('登录成功')
			} else {
				alert(data.msg)
			}
		})
	}
	//注册
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
			} else {
				alert(data.msg)
			}
		})
	}
	//价格
	$http.get('/jiage').success(function (data) {
		$scope.jiage = data.msg
		$scope.arrjiage = [];
		if (data.ok) {
			angular.forEach($scope.jiage, function (v, k) {
				$scope.arrjiage.push(v.jiage)
			})
		} else {
			alert(data.msg)
		}

	})
	//型号
	$http.get('/xhao').success(function (data) {
		$scope.xhao = data.msg
		$scope.arrxhao = [];
		if (data.ok) {
			angular.forEach($scope.xhao, function (v, k) {
				$scope.arrxhao.push(v.xinghao)
			})
		} else {
			alert(data.msg)
		}
	})
	//论坛数据
	$http.get('/luntan').success(function (data) {

		if (data.ok) {
			$scope.luntan = data.msg
		} else {
			alert(data.msg)
		}
	})
	//卖车的一些数据
	$scope.show2=0;
	$http.get('/showcar').success(function (data) {
		$scope.showcar= data.msg
		$scope.arrshowcar= [];
		$scope.jsoncar={}
		if (data.ok) {
			angular.forEach($scope.showcar, function (v, k) {
				$scope.jsoncar[v.fenlei]=0;
			})
			angular.forEach($scope.jsoncar, function (v1, k1) {
				var arrcar=[]
				angular.forEach($scope.showcar, function (v, k) {
					if(k1==v.fenlei){
						arrcar.push({herf:v.herf,src:v.src,title:v.title,time:v.tiem,jiage:v.jiage,xinchejia:v.xinchejia})
					}
				})
				$scope.arrshowcar.push({fenlei:k1,neirong:arrcar})
			})
		} else {
			alert(data.msg)
		}

	})
	$scope.show1=function (n) {
		$scope.show2=n;
	}

	//车主故事的数据
	//论坛数据
	$http.get('/gushi').success(function (data) {
		if (data.ok) {
			$scope.gushi= data.msg
		} else {
			alert(data.msg)
		}
	})
	//车主故事自定义指令  没出来
	app.directive('ngXuan',function(){
		return{
			restrict:'ECAM',
			templateUrl:'gushi.html'
		}

	})
	
	//媒体新闻数据
	$http.get('/news').success(function (data) {
		if (data.ok) {
			$scope.news= data.msg
		} else {
			alert(data.msg)
		}
	})
})

