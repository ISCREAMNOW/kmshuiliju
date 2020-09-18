<?php


/**
 * 该路由定义文件仅对api应用有效
 *
 * @author 雲溪荏苒 <290648237@qq.com>
 * @date 2017/10/18
 */
use think\Route;
//获取基本信息
Route::get('BasedInfos','api/BasedInfos/index');