<?php
namespace app\admin\controller;

use controller\BasicAdmin;
use think\Db;

class Terminal extends BasicAdmin{
    /**
     * 指定文档内容表
     * @var string
     */
    public $table='terminal';

    public $tableItem='terminal_data';

    public $type='';
    //设备列表
    public function index(){
        $this->title='设备列表';
        $get=$this->request->get();
        $db = Db::name($this->table)->order('id desc');
        // 应用搜索条件
        foreach (['t_code', 'analytic_status','unit_type','type'] as $key) {
            if (isset($get[$key]) && $get[$key] !== '') {
                $db->where($key, 'like', "%{$get[$key]}%")->order("id desc");
            }
        }
        return parent::_list($db, true);
    }
//    详情数据列表
    public function datalist(){
        $postdata=$this->request->param();
        $this->type=$postdata['type'];
        $db = Db::name($this->tableItem);
        $db->where('id',$postdata['id'])->where('type',$postdata['type'])->order("add_time desc");
        return parent::_list($db, true);
    }

    //数据统计
    public function statis(){
        //定义变量
        $countdata='';
        $pollcount=0;
        $cleancount=0;
        //获取当前时间
        $now=time();
        $date = date(strtotime('-24 hours', $now));
        //查询当天的所有设备数据
        $db=Db::name($this->tableItem);
        $intodata=$db->where('type',1)->where('add_time','between',[$date,$now])->select();
        for ($i=0;$i<count($intodata);$i++){
            $intodata[$i]['add_time']=date('Y/m/d-h:i:sa',$intodata[$i]['add_time']);
            $intoconts[$i]['time']=$intodata[$i]['add_time'];
            $intoconts[$i]['id']=$intodata[$i]['id'];
            $intoconts[$i]['type']=$intodata[$i]['type'];
            $intoconts[$i]['counts']=$intodata[$i]['cod']+$intodata[$i]['phosphorus']+$intodata[$i]['nitrogen'];
        }
        $outdata=$db->where('type',2)->where('add_time','between',[$date,$now])->select();
        for ($i=0;$i<count($outdata);$i++){
            $outdata[$i]['add_time']=date('Y/m/d-h:i:sa',$outdata[$i]['add_time']);
            $outconts[$i]['time']=$outdata[$i]['add_time'];
            $outconts[$i]['id']=$outdata[$i]['id'];
            $outconts[$i]['type']=$outdata[$i]['type'];
            $outconts[$i]['counts']=$outdata[$i]['cod']+$outdata[$i]['phosphorus']+$outdata[$i]['nitrogen'];
        }
        for ($i=0;$i<count($intoconts);$i++){
            $pollcount+=$intoconts[$i]['counts'];
        }
        for ($i=0;$i<count($outconts);$i++){
            $cleancount+=$outconts[$i]['counts'];
        }
        $this->assign(['intodata'=>$intodata,'outdata'=>$outdata,'counts'=>$intoconts,'outcounts'=>$outconts,
            'cleancount'=>$cleancount,'pollcount'=>$pollcount
            ]);
        return $this->fetch('',['title'=>'数据总览']);

    }

}