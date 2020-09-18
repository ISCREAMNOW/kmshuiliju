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
   public function getAllTerimalList($page=1,$size=10){
       return self::paginate($page,$size);
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
            $query->where('add_time','between',[$endtime,$statime]);
        }])->paginate();
        return $terDatas;
    }
}