
        const promise = function (params) {
            return new Promise(function (resolve, reject) {
                if (params) {
                    resolve("����");
                }
                else {
                    reject("����");
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

        Promise.all([promise("�׽�Ʈ")]).then(function (values) { alert(values); })
