<?php


namespace app\terminal\model;


use think\Model;

class Terminal extends Base
{
   protected $table="terminal";

    //关联设备表
    public function terData(){
        return $this->belongsTo('TerminalData','t_code','id');
    }

   //分页返回所有列表
   public function getAllTerimalList(){
       return self::paginate(10);
   }
   //建立关联查询
    public function getWithDataTerminal(){
        $ter=new Terminal();
        $terDatas=$ter->with('terData')->select();
        return $terDatas;
    }
    //根据时间区间查询数据库中的数据集
    public function getTerDataBytime($statime,$endtime,$type){
        $ter=new Terminal();
        $terDatas=$ter->where('type','=',$type)->with(['terData'=>function($query) use($statime,$endtime){
            $query->where('add_time','between',[$endtime,$statime])->limit(100)->order('add_time asc');
        }])->paginate(10);
        return $terDatas;
    }
    //关联统计
    public function getCountByWith(){

    }
}