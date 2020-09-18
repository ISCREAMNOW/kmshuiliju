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
}