<?php
/**
 * @Author: Your name
 * @Date:   2020-09-18 09:18:51
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-09-18 09:23:59
 */
 

namespace app\terminal\controller;

use app\terminal\model\Terminal;
use think\Controller;
use think\Request;

class TerminalList extends Controller{
    // 返回数据列表
    public function terminalList(){
       //TODO:连接数据库，查询所有列表的数据并返回到前端
       $terModel=new Terminal();
       $terlist=$terModel->getAllTerimalList();
       return json($terlist);
    }
    //查询数据库中每台设备的数据
    public function getTerminalData(){
        $ter=new Terminal();
        $terDatas=$ter->getWithDataTerminal();
        return json($terDatas);
    }
    //根据时间段查询数据库中的数据
    public function getBytime(){
        $req=Request::instance();
        $startime=$req->param('startime');
        $endtime=$req->param('endtime');
        $type=$req->param('type');
        if ($endtime<$startime){
            return $this->_retemplate('结束时间应该大于开始时间','200','error');
        }
        $ter=new Terminal();
        $res=$ter->getTerDataBytime($startime,$endtime,$type);
        return json($res);

    }
    //定义返回的模板
    private function _retemplate($msg,$code,$status){
        $res=['msg'=>$msg,'code'=>$code,'status'=>$status];
        return $res;
    }
}