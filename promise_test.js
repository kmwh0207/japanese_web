
        const promise = function (params) {
            return new Promise(function (resolve, reject) {
                if (params) {
                    resolve("성공");
                }
                else {
                    reject("실패");
                }
            });
        }
        promise(true).then(function (result) {
            alert(result);
            return "success2";
        }, function (err) {
            console.log(err)
            return "error2";
        }).then(function (result) {
            alert(result);
        }, function (err) {
            alert(err);
        }).catch(function (err) { alert("that's error") });

        Promise.all([promise("테스트")]).then(function (values) { alert(values); })
