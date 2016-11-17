$(function(){
    var oStorage = window.localStorage;

    function $(id){
        return document.getElementById(id);
    }

    // 保存数据
    $('saveBtn').onclick = function(){
        var name = $('name').value;
        var gender;
        if($('gender1').checked==true){
            gender = 1;
        }else if($('gender2').checked==true){
            gender = 2;
        }

        var data = {};
        data['name'] = name;
        data['gender'] = gender;

        oStorage.setItem('data', JSON.stringify(data));
    }

    // 获取数据
    $('getBtn').onclick = function(){
        getStorageItem();
    }


    // 获取数据
    function getStorageItem(){
        var data = JSON.parse(oStorage.getItem('data'));
        var name,gender;

        if(data){
            name = data['name'];
            gender = data['gender'];
        }else{
            name = '';
            gender = 0;
        }

        $('name').value = name;

        if(gender==1){
            $('gender1').checked = true;
        }else if(gender==2){
            $('gender2').checked = true;
        }else{
            $('gender1').checked = false;
            $('gender2').checked = false;
        }
    }


    // 清空数据
    $('clearBtn').onclick = function(){
        oStorage.clear();
        $('name').value = '';
        $('gender1').checked = false;
        $('gender2').checked = false;
    }

    // 监听数据变化,当数据发生变化时,同步数据显示
    window.onstorage = function(event){
        var status = {}
        status.key = event.key;
        status.oldValue = event.oldValue;
        status.newValue = event.newValue;
        status.url = event.url;
        status.storage = event.storageArea;

        getStorageItem(); // 数据发生变化时,重新获取数据
    }

)};