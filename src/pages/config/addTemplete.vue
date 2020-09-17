<template>
  <div class="hb-add-templete">
    <wx-header showBack>
      <span slot="headerTitle">{{ templateId ? '编辑模板' : '新建模板' }}</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content">
        <div class="config-templete-container">
          <el-form
            label-width="100px"
            :model="template"
            :rules="template.rules"
            ref="templateForm"
            class="top-form"
          >
            <el-form-item label="模板名称：" prop="name">
              <el-input
                v-model="template.name"
                size="small"
                class="reset-input"
                :maxlength="20"
                placeholder="请输入模板名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input
                class="reset-input"
                size="small"
                v-model="template.remark"
                :maxlength="100"
                placeholder="请简单输入模板描述"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="flex config-templete-top">
            <div class="coding-left-part">
              <el-tabs
                v-model="activeName"
                @tab-click="handleTabClick"
                class="tabs-flex config-tabs"
              >
                <el-tab-pane label="功能配置" :disabled="!!1"></el-tab-pane>
                <el-tab-pane label="基础配置" name="baseConfig" style="font-size:12px;">
                  <div class="base-config">
                    <div class="config-item border-top">
                      <div class="config-item-label">
                        <span class="left-label">体检功能</span>
                      </div>
                      <div class="config-item-column-content">
                        <p>视力检测、辨色力检测、听力检测、躯干与四肢检测</p>
                        <p style="margin-top:7px;">
                          拍照片数量
                          <el-select
                            class="photo-number"
                            placeholder
                            v-model="baseConfig.CAMERA_FUNCTION.config"
                          >
                            <el-option :key="'photonum' + i" v-for="i of 3" :label="i" :value="i"></el-option>
                          </el-select>张
                        </p>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">仅照相</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.CAMERA_FUNCTION.edit"
                          @change="handleCFChange"
                          v-model="baseConfig.CAMERA_FUNCTION.open"
                        ></el-switch>
                        <span class="config-description">在首页显示仅照相按钮</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">仅体检</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.IS_ONLY_HEALTH.edit"
                          @change="handleCFChange"
                          v-model="baseConfig.IS_ONLY_HEALTH.open"
                        ></el-switch>
                        <span class="config-description">在首页显示仅体检按钮</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">系统检测项</span>
                      </div>
                      <div class="config-item-right">
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="!baseConfig.MULTI_PERSON_USE.edit"
                            v-model="baseConfig.MULTI_PERSON_USE.open"
                          ></el-switch>
                          <span class="config-description">检测多人使用体检机</span>
                        </div>
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="!baseConfig.OPEN_DOOR.edit"
                            v-model="baseConfig.OPEN_DOOR.open"
                          ></el-switch>
                          <span class="config-description">检测舱门打开</span>
                        </div>
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="!baseConfig.HEALTH_LIGHT.edit"
                            v-model="baseConfig.HEALTH_LIGHT.open"
                          ></el-switch>
                          <span class="config-description">体检状态提示灯</span>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">业务类型</span>
                      </div>
                      <div class="config-item-right yw-type">
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="baseConfig.APPLY_LICENSE.edit"
                            v-model="baseConfig.APPLY_LICENSE.open"
                          ></el-switch>
                          <el-input
                            :disabled="!baseConfig.APPLY_LICENSE.edit"
                            v-model="baseConfig.APPLY_LICENSE.config"
                          ></el-input>
                          <img src="./images/slzj.png" alt class="business-icon" />
                        </div>
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="baseConfig.REAPPLY_LICENSE.edit"
                            v-model="baseConfig.REAPPLY_LICENSE.open"
                          ></el-switch>
                          <el-input
                            :disabled="!baseConfig.REAPPLY_LICENSE.edit"
                            v-model="baseConfig.REAPPLY_LICENSE.config"
                          ></el-input>
                          <img src="./images/bzhz.png" alt class="business-icon" />
                        </div>
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="baseConfig.ANNUAL_LICENSE.edit"
                            v-model="baseConfig.ANNUAL_LICENSE.open"
                          ></el-switch>
                          <el-input
                            :disabled="!baseConfig.ANNUAL_LICENSE.edit"
                            v-model="baseConfig.ANNUAL_LICENSE.config"
                          ></el-input>
                          <img src="./images/ns.png" alt class="business-icon" />
                        </div>
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="baseConfig.INCREASES_LICENSE.edit"
                            v-model="baseConfig.INCREASES_LICENSE.open"
                          ></el-switch>
                          <el-input
                            :disabled="!baseConfig.INCREASES_LICENSE.edit"
                            v-model="baseConfig.INCREASES_LICENSE.config"
                          ></el-input>
                          <img src="./images/zj.png" alt class="business-icon" />
                        </div>
                        <div class="config-item-content">
                          <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="baseConfig.DECREASES_LICENSE.edit"
                            v-model="baseConfig.DECREASES_LICENSE.open"
                          ></el-switch>
                          <el-input
                            :disabled="!baseConfig.DECREASES_LICENSE.edit"
                            v-model="baseConfig.DECREASES_LICENSE.config"
                          ></el-input>
                          <img src="./images/jj.png" alt class="business-icon" />
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">选择默认驾校</span>
                      </div>
                      <div class="config-item-content" id="defaultds">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.DEFAULT_DRIVER_SCHOOL.edit"
                          v-model="baseConfig.DEFAULT_DRIVER_SCHOOL.open"
                        ></el-switch>
                        <el-select
                          class="ds_select first-select"
                          placeholder="省"
                          v-model="baseConfig.DEFAULT_DRIVER_SCHOOL.config.PROVINCE_CODE"
                          @change="updateList('city')"
                        >
                          <el-option
                            :key="item.id"
                            v-for="item of provinceList"
                            :label="item.name"
                            :value="item.code"
                          ></el-option>
                        </el-select>
                        <el-select
                          class="ds_select"
                          placeholder="市"
                          v-model="baseConfig.DEFAULT_DRIVER_SCHOOL.config.CITY_CODE"
                          @change="updateList('district')"
                        >
                          <el-option
                            :key="item.id"
                            v-for="item of cityList"
                            :label="item.name"
                            :value="item.code"
                          ></el-option>
                        </el-select>
                        <el-select
                          class="ds_select"
                          placeholder="区"
                          v-model="baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE"
                          @change="updateList('school')"
                        >
                          <el-option
                            :key="item.id"
                            v-for="item of districtList"
                            :label="item.name"
                            :value="item.code"
                          ></el-option>
                        </el-select>
                        <el-select
                          class="ds_select last-select"
                          placeholder="请选择驾校"
                          v-model="baseConfig.DEFAULT_DRIVER_SCHOOL.config.SCHOOL_CODE"
                        >
                          <el-option
                            :key="item.id"
                            v-for="item of schoolList"
                            :label="item.schoolSimpleName"
                            :value="item.schoolCode"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">确认体检结果</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.IS_CONFIRMRESULT.edit"
                          v-model="baseConfig.IS_CONFIRMRESULT.open"
                        ></el-switch>
                        <span class="config-description">确认体检结果</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">申告</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.IS_DECLARATION.edit"
                          v-model="baseConfig.IS_DECLARATION.open"
                        ></el-switch>
                        <span class="config-description">申告</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">签名</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.IS_SIGNATURE.edit"
                          v-model="baseConfig.IS_SIGNATURE.open"
                        ></el-switch>
                        <span class="config-description">签名</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">收款</span>
                      </div>
                      <div class="config-item-right">
                        <div
                          class="config-item-content"
                          style="padding:0 ;margin:0; border-bottom: 0.01rem solid #dcdcdc; "
                        >
                          <div class="config-item-part" style="padding:0.36rem 0">体检</div>
                          <div style="margin: 0.1rem 0; margin-left:0.1rem ">
                            <span class="check-pay-title" style="margin-left:0;">体检收费（元）</span>
                            <el-input
                              v-model="baseConfig.PAYMENT.config.HEALTH_PRICE"
                              style="margin: 0.1rem 0;"
                            ></el-input>
                            <br />
                            <!-- :click="baseConfig.HEALTH_PRINT_PHOTO.open"
                            :disabled="baseConfig.HEALTH_PRINT_PHOTO.edit"-->
                            <!-- @change="changePhotoState" -->
                            <el-checkbox
                              :true-label="1"
                              :false-label="0"
                              label="打印照片"
                              class="photo-checkbox-style"
                              v-model="baseConfig.HEALTH_PRINT_PHOTO.open"
                              :disabled="!baseConfig.HEALTH_PRINT_PHOTO.edit"
                              @change="changePhotoState"
                            ></el-checkbox>
                            <span style="margin-left: 0.1rem;">打印照相收费（元）</span>
                            <el-input v-model="baseConfig.PAYMENT.config.PHOTO_PRICE"></el-input>
                          </div>
                        </div>
                        <div
                          class="config-item-content"
                          style="padding:0 ;margin:0; border-bottom: 0.01rem solid #dcdcdc; "
                        >
                          <div class="config-item-part">仅照相</div>
                          <!-- <el-switch
                          style="margin: 0.1rem 0; margin-left:0.1rem "
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="!baseConfig.PAYMENT.edit"
                            v-model="baseConfig.PAYMENT.open">
                          </el-switch>-->
                          <span style="margin-left: 0.1rem;">打印照相收费（元）</span>
                          <!-- v-model="baseConfig.CAMERA_FUNCTION_PAYMENT.config.PRICE" -->
                          <el-input v-model="baseConfig.CAMERA_FUNCTION_PAYMENT.config.PRICE"></el-input>
                        </div>
                        <div
                          class="config-item-content"
                          style="padding:0 ;margin:0; border-bottom: 0.01rem solid #dcdcdc; "
                        >
                          <div class="config-item-part">收款方式</div>
                          <span
                            class="check-pay-title"
                            style="margin: 0.1rem 0; margin-left:0.1rem;color:#C0C4CC; "
                          >{{ payConfig[15].config.SINGLE_PAYMENT==1? '统一收款' : '分账收款'}}</span>
                        </div>
                        <div class="config-item-content pay-tj" style="padding:0 ;margin:0; ">
                          <div
                            class="config-item-part"
                            :class="{ 'pxState': payConfig[15].config.SINGLE_PAYMENT==0 }"
                          >收款途径</div>
                          <div
                            v-if="payConfig[15].config.SINGLE_PAYMENT==1"
                            style="margin: 0.1rem 0; margin-left:0.1rem "
                          >
                            <el-checkbox
                              :true-label="1"
                              :false-label="0"
                              v-model="payConfig[10].open"
                              :disabled="!!1"
                              label="支付宝"
                            ></el-checkbox>
                            <el-checkbox
                              :true-label="1"
                              :false-label="0"
                              v-model="payConfig[11].open"
                              :disabled="!!1"
                              label="微信"
                            ></el-checkbox>
                            <el-checkbox
                              :true-label="1"
                              :false-label="0"
                              v-model="payConfig[12].open"
                              :disabled="!!1"
                              label="银联"
                            ></el-checkbox>
                            <el-checkbox
                              :true-label="1"
                              :false-label="0"
                              v-model="payConfig[13].open"
                              :disabled="!!1"
                              label="工行"
                            ></el-checkbox>
                            <el-checkbox
                              :true-label="1"
                              :false-label="0"
                              v-model="payConfig[14].open"
                              :disabled="!!1"
                              label="农行"
                            ></el-checkbox>
                          </div>
                          <div
                            v-if="payConfig[15].config.SINGLE_PAYMENT==0"
                            style="margin: 0.1rem 0; margin-left:0.1rem "
                          >
                            <div>
                              <label style="margin-right:0.21rem">体检</label>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[0].open"
                                :disabled="!!1"
                                label="支付宝"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[1].open"
                                :disabled="!!1"
                                label="微信"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[2].open"
                                :disabled="!!1"
                                label="银联"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[3].open"
                                :disabled="!!1"
                                label="工行"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[4].open"
                                :disabled="!!1"
                                label="农行"
                              ></el-checkbox>
                            </div>
                            <br />
                            <div>
                              <label style="margin-right:0.21rem">打印照片</label>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[5].open"
                                :disabled="!!1"
                                label="支付宝"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[6].open"
                                :disabled="!!1"
                                label="微信"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[7].open"
                                :disabled="!!1"
                                label="银联"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[8].open"
                                :disabled="!!1"
                                label="工行"
                              ></el-checkbox>
                              <el-checkbox
                                :true-label="1"
                                :false-label="0"
                                v-model="payConfig[9].open"
                                :disabled="!!1"
                                label="农行"
                              ></el-checkbox>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">打印小票</span>
                      </div>
                      <div class="config-item-content check-style">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.PRINT_RECEIPT.edit"
                          v-model="baseConfig.PRINT_RECEIPT.open"
                        ></el-switch>
                        <span class="config-description label-right-margin">打印小票</span>
                        <el-radio
                          label="自动打印"
                          :disabled="!baseConfig.PRINT_RECEIPT.config.EDIT"
                          v-model="baseConfig.PRINT_RECEIPT.config.AUTO"
                        ></el-radio>
                        <el-radio
                          label="手动打印"
                          :disabled="!baseConfig.PRINT_RECEIPT.config.EDIT"
                          v-model="baseConfig.PRINT_RECEIPT.config.AUTO"
                        ></el-radio>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">打印体检报告</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.PRINT_REPORT.edit"
                          v-model="baseConfig.PRINT_REPORT.open"
                        ></el-switch>
                        <span class="config-description">打印体检报告</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label label-right-margin">打印照片</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.PRINT_PHOTO.edit"
                          @change="handlePPChange"
                          v-model="baseConfig.PRINT_PHOTO.open"
                        ></el-switch>
                        <span class="config-description">打印照片</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">体检次数</span>
                      </div>
                      <div class="config-item-column-content">
                        <p>
                          每天允许体检
                          <el-select
                            class="photo-number"
                            placeholder
                            v-model="baseConfig.HEALTH_COUNT.config"
                          >
                            <el-option
                              :key="'standardNumber' + i"
                              v-for="i of 20"
                              :label="i"
                              :value="i"
                            ></el-option>
                          </el-select>次
                        </p>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">自动升级时间</span>
                      </div>
                      <div class="config-item-content">
                        <el-time-picker
                          :disabled="!baseConfig.AUTO_UPDATE_TIME.open"
                          v-model="baseConfig.AUTO_UPDATE_TIME.config"
                        ></el-time-picker>
                        <span class="config-small-description">(建议选择下班后无人体检的时间)</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">自动审核</span>
                      </div>
                      <div class="config-item-content">
                        <el-switch
                          :active-value="1"
                          :inactive-value="0"
                          :disabled="!baseConfig.AUTO_APPROVE.edit"
                          v-model="baseConfig.AUTO_APPROVE.open"
                        ></el-switch>
                        <el-time-picker
                          v-model="baseConfig.AUTO_APPROVE.config.startTime"
                          placeholder="开始时间"
                          size="mini"
                          value-format="HH:mm:ss"
                        ></el-time-picker>
                        <el-time-picker
                          v-model="baseConfig.AUTO_APPROVE.config.endTime"
                          placeholder="结束时间"
                          size="mini"
                          style="margin-left:-10px"
                          value-format="HH:mm:ss"
                        ></el-time-picker>
                        <span class="config-description" style="margin-left:-10px">将合格的体检单设为通过审核并上传</span>
                        <span class="config-small-description">(请谨慎开启)</span>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">体检不合格提示</span>
                      </div>
                      <div class="config-item-content">
                        <div class="config-item-right right-pz">
                          <div class="flex">
                            <p style="margin-top:7px;" class="pop-up-time">
                              显示弹窗
                              <el-input
                                @keyup.native="handleTimeValidate"
                                type="number"
                                class="photo-number"
                                v-model="baseConfig.POP_WINDOW_TIME.config"
                              ></el-input>秒
                              <span class="config-small-description">(最多120秒)</span>
                            </p>
                          </div>
                          <el-radio
                            v-model="baseConfig.FAIL_MESSAGE.config.VALUE"
                            label="体检未达到驾考要求,系统即将自动退出"
                          >体检未达到驾考要求,系统即将自动退出</el-radio>
                          <el-radio
                            v-model="baseConfig.FAIL_MESSAGE.config.VALUE"
                            label="体检未达到驾考要求,请咨询工作人员"
                          >体检未达到驾考要求,请咨询工作人员</el-radio>
                          <el-radio v-model="baseConfig.FAIL_MESSAGE.config.VALUE" :label="3">
                            <div class="radio-content">
                              <span>自定义</span>
                              <el-input
                                type="textarea"
                                placeholder="请输入内容"
                                :disabled="baseConfig.FAIL_MESSAGE.config.VALUE != 3"
                                v-model="baseConfig.FAIL_MESSAGE.config.LABEL"
                                maxlength="60"
                                show-word-limit
                                class="zd-input"
                              ></el-input>
                            </div>
                          </el-radio>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="体检配置" name="healthConfig">
                  <div class="base-config">
                    <div class="config-item border-top">
                      <div class="config-item-label">
                        <span class="left-label">体检功能</span>
                      </div>
                      <div class="config-item-content">
                        <span>认证对比阈值</span>
                        <div class="slider-con">
                          <el-slider
                            :disabled="!healthConfig.COMPARED_THRESHOLD.edit"
                            v-model="healthConfig.COMPARED_THRESHOLD.config"
                          ></el-slider>
                        </div>
                        <div>
                          <p class="slider-describe">数值越高，越难通过</p>
                          <p class="slider-describe">建议值50-90</p>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">视力检测</span>
                      </div>
                      <div class="config-item-right">
                        <div class="warp-column-item">
                          <div class="warp-column-label">
                            <span>5.0合格</span>
                          </div>
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <p>适应车型：大型客车、牵引车、城市公交车、中型客车、大型货车、无轨电车或者有轨电车</p>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_LARGE.check"
                                  :disabled="!healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_LARGE.edit"
                                >大视标</el-checkbox>
                                <span class="config-small-description">检测一次</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_MIDDLE.check"
                                  :disabled="!healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_MIDDLE.edit"
                                >中视标</el-checkbox>
                                <span class="config-small-description">检测一次</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_49.check"
                                  :disabled="!healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_49.edit"
                                >4.9视标</el-checkbox>
                                <span class="config-small-description">
                                  检测
                                  <el-select
                                    :disabled="!!1"
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_49.count"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 3"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_50.check"
                                  :disabled="!!1"
                                >5.0视标</el-checkbox>
                                <span class="config-small-description">
                                  检测
                                  <el-select
                                    :disabled="!!1"
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.EYE_DETECTION.config['5.0'].TYPEAB_TARGETS_50.count"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 3"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="warp-column-item">
                          <div class="warp-column-label">
                            <span>4.9合格</span>
                          </div>
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <p>适应车型：除上述外的其他车型</p>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_LARGE.check"
                                  :disabled="!healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_LARGE.edit"
                                >大视标</el-checkbox>
                                <span class="config-small-description">检测一次</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_MIDDLE.check"
                                  :disabled="!healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_MIDDLE.edit"
                                >中视标</el-checkbox>
                                <span class="config-small-description">检测一次</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_49.check"
                                  :disabled="!!1"
                                >4.9视标</el-checkbox>
                                <span class="config-small-description">
                                  检测
                                  <el-select
                                    :disabled="!!1"
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_49.count"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 3"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_50.check"
                                  :disabled="!healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_50.edit"
                                >5.0视标</el-checkbox>
                                <span class="config-small-description">
                                  检测
                                  <el-select
                                    :disabled="!!1"
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.EYE_DETECTION.config['4.9'].TYPEAB_TARGETS_50.count"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 3"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">辨色力检测</span>
                      </div>
                      <div class="config-item-right">
                        <div class="warp-column-item">
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].NUM_PIC.check"
                                  :disabled="!healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].NUM_PIC.edit"
                                >简单图片</el-checkbox>
                                <span class="config-small-description">
                                  检测
                                  <el-select
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].NUM_PIC.count"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 6"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-checkbox
                                  :true-label="1"
                                  :false-label="0"
                                  v-model="healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].GRAPHICS_PIC.check"
                                  :disabled="!healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].GRAPHICS_PIC.edit"
                                >复杂图片</el-checkbox>
                                <span class="config-small-description">
                                  检测
                                  <el-select
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].GRAPHICS_PIC.count"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 6"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">听力检测</span>
                      </div>
                      <div class="config-item-right">
                        <div class="warp-column-item">
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <div class="config-item-content no-padding-left">
                                <span class="config-description no-margin-left">
                                  播放音频
                                  <el-select
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.VOICE_TIME.config"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 6"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.VOICE_REPEAT_TIME.edit"
                                  v-model="healthConfig.VOICE_REPEAT_TIME.open"
                                ></el-switch>
                                <span class="config-description">重播音频</span>
                                <span class="config-description">
                                  每段音频重播
                                  <el-select
                                    class="photo-number"
                                    placeholder
                                    v-model="healthConfig.VOICE_REPEAT_TIME.config"
                                  >
                                    <el-option
                                      :key="'photonum' + i"
                                      v-for="i of 3"
                                      :label="i"
                                      :value="i"
                                    ></el-option>
                                  </el-select>次
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">躯干与四肢检测</span>
                      </div>
                      <div class="config-item-right">
                        <div class="warp-column-item">
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.SIT_POSITIVE.edit"
                                  v-model="healthConfig.SIT_POSITIVE.open"
                                ></el-switch>
                                <span class="config-description">提示坐正</span>
                                <div style="margin-left:60px;">
                                  <el-switch
                                    value="0"
                                    :disabled="!!1"
                                    :active-value="1"
                                    :inactive-value="0"
                                  ></el-switch>
                                  <span class="config-description">高级配置</span>
                                </div>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.HINT_TURN_AROUND.edit"
                                  v-model="healthConfig.HINT_TURN_AROUND.open"
                                ></el-switch>
                                <span class="config-description">左右转头</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.HINT_ROTATE_HANDS.edit"
                                  v-model="healthConfig.HINT_ROTATE_HANDS.open"
                                ></el-switch>
                                <span class="config-description">转动双手</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.HINT_FIST.edit"
                                  v-model="healthConfig.HINT_FIST.open"
                                ></el-switch>
                                <span class="config-description">握拳</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.MEASURING_HEIGHT.edit"
                                  v-model="healthConfig.MEASURING_HEIGHT.open"
                                ></el-switch>
                                <span class="config-description">测量身高</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.REMEASURING_HEIGHT.edit"
                                  v-model="healthConfig.REMEASURING_HEIGHT.open"
                                ></el-switch>
                                <span class="config-description">重测身高</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.HINT_LEG_LIFT.edit"
                                  v-model="healthConfig.HINT_LEG_LIFT.open"
                                ></el-switch>
                                <span class="config-description">抬腿</span>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <el-switch
                                  :active-value="1"
                                  :inactive-value="0"
                                  :disabled="!healthConfig.PROSTHESIS_DETECTION_OF_INFRARED.edit"
                                  v-model="healthConfig.PROSTHESIS_DETECTION_OF_INFRARED.open"
                                ></el-switch>
                                <span class="config-description">下肢健全红外检测</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="收款配置" name="payConfig">
                  <div class="pay-config payMethod-box">
                    <div class="config-item border-top">
                      <div class="config-item-label">
                        <span class="left-label">收款方式</span>
                      </div>
                      <div class="pay-method">
                        <el-radio-group v-model="payConfig[15].config.SINGLE_PAYMENT">
                          <el-radio :label="1">统一收款</el-radio>
                          <el-radio :label="0">分账收款</el-radio>
                        </el-radio-group>
                      </div>
                    </div>
                    <div v-if="payConfig[15].config.SINGLE_PAYMENT==1">
                      <div class="config-item">
                        <div class="config-item-label">
                          <span class="left-label">支付宝</span>
                        </div>
                        <div class="config-item-right">
                          <div class="warp-column-item">
                            <div class="warp-column-label no-border-right">
                              <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                :disabled="!payConfig[10].edit"
                                v-model="payConfig[10].open"
                              ></el-switch>
                            </div>
                            <div class="warp-column-content">
                              <div class="list-row-item">
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>appID</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[10].open"
                                    v-model="payConfig[10].config.APP_ID"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>公钥</span>
                                    <span>publicKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[10].open"
                                    v-model="payConfig[10].config.PUBLIC_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>私钥</span>
                                    <span>privateKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[10].open"
                                    v-model="payConfig[10].config.PRIVATE_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>签名算法类型</span>
                                    <span>sign Type</span>
                                  </div>
                                  <el-select
                                    :disabled="!payConfig[10].open"
                                    v-model="payConfig[10].config.SIGN_TYPE"
                                  >
                                    <el-option
                                      v-for="item of arithmeticDictionary.apply"
                                      :key="item.id"
                                      :label="item.value"
                                      :value="item.id"
                                    ></el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="config-item">
                        <div class="config-item-label">
                          <span class="left-label">微信</span>
                        </div>
                        <div class="config-item-right">
                          <div class="warp-column-item">
                            <div class="warp-column-label no-border-right">
                              <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                :disabled="!payConfig[11].edit"
                                v-model="payConfig[11].open"
                              ></el-switch>
                            </div>
                            <div class="warp-column-content">
                              <div class="list-row-item">
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>appID</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[11].open"
                                    v-model="payConfig[11].config.APP_ID"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>私钥</span>
                                    <span>privateKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[11].open"
                                    v-model="payConfig[11].config.PRIVATE_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>商户收款账号</span>
                                    <span>partner</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[11].open"
                                    v-model="payConfig[11].config.PARTNER"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>退款证书</span>
                                    <span>refundStore</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[11].open"
                                    v-model="payConfig[11].config.KEYSTORE_STR"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>退款证书密钥</span>
                                    <span>refundKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[11].open"
                                    v-model="payConfig[11].config.CERT_PRIVATE_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>签名算法类型</span>
                                    <span>sign Type</span>
                                  </div>
                                  <el-select
                                    :disabled="!payConfig[11].open"
                                    v-model="payConfig[11].config.SIGN_TYPE"
                                  >
                                    <el-option
                                      v-for="item of arithmeticDictionary.wchat"
                                      :key="item.id"
                                      :label="item.value"
                                      :value="item.id"
                                    ></el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="config-item">
                        <div class="config-item-label">
                          <span class="left-label">银联</span>
                        </div>
                        <div class="config-item-right">
                          <div class="warp-column-item">
                            <div class="warp-column-label no-border-right">
                              <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                :disabled="!payConfig[12].edit"
                                v-model="payConfig[12].open"
                              ></el-switch>
                            </div>
                            <div class="warp-column-content">
                              <div class="list-row-item">
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>商户号</span>
                                    <span>partner</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[12].open"
                                    v-model="payConfig[12].config.PARTNER"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>终端号</span>
                                    <span>tid</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[12].open"
                                    v-model="payConfig[12].config.TID"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>消息来源</span>
                                    <span>msgSrc</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[12].open"
                                    v-model="payConfig[12].config.MSG_SRC"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>来源编号</span>
                                    <span>msgSrcId</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[12].open"
                                    v-model="payConfig[12].config.MSG_SRC_ID"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>私钥</span>
                                    <span>privateKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[12].open"
                                    v-model="payConfig[12].config.PRIVATE_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>签名算法类型</span>
                                    <span>sign Type</span>
                                  </div>
                                  <el-select
                                    :disabled="!payConfig[12].open"
                                    v-model="payConfig[12].config.SIGN_TYPE"
                                  >
                                    <el-option
                                      v-for="item of arithmeticDictionary.unionpay"
                                      :key="item.id"
                                      :label="item.value"
                                      :value="item.id"
                                    ></el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="config-item">
                        <div class="config-item-label">
                          <span class="left-label">工行</span>
                        </div>
                        <div class="config-item-right">
                          <div class="warp-column-item">
                            <div class="warp-column-label no-border-right">
                              <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                :disabled="!payConfig[13].edit"
                                v-model="payConfig[13].open"
                              ></el-switch>
                            </div>
                            <div class="warp-column-content">
                              <div class="list-row-item">
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>商户号</span>
                                    <span>partner</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[13].open"
                                    v-model="payConfig[13].config.PARTNER"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>APPID</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[13].open"
                                    v-model="payConfig[13].config.APP_ID"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>档案编号</span>
                                    <span>STORE_CODE</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[13].open"
                                    v-model="payConfig[13].config.STORE_CODE"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>私钥</span>
                                    <span>privateKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[13].open"
                                    v-model="payConfig[13].config.PRIVATE_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>公钥</span>
                                    <span>publicKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[13].open"
                                    v-model="payConfig[13].config.PUBLIC_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>签名算法类型</span>
                                    <span>sign Type</span>
                                  </div>
                                  <el-select
                                    :disabled="!payConfig[13].open"
                                    v-model="payConfig[13].config.SIGN_TYPE"
                                  >
                                    <el-option
                                      v-for="item of arithmeticDictionary.icbc"
                                      :key="item.id"
                                      :label="item.value"
                                      :value="item.id"
                                    ></el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="config-item">
                        <div class="config-item-label">
                          <span class="left-label">农行</span>
                        </div>
                        <div class="config-item-right">
                          <div class="warp-column-item">
                            <div class="warp-column-label no-border-right">
                              <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                :disabled="!payConfig[14].edit"
                                v-model="payConfig[14].open"
                              ></el-switch>
                            </div>
                            <div class="warp-column-content">
                              <div class="list-row-item">
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>商户号</span>
                                    <span>partner</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[14].open"
                                    v-model="payConfig[14].config.PARTNER"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>公钥</span>
                                    <span>publicKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[14].open"
                                    v-model="payConfig[14].config.PUBLIC_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>私钥</span>
                                    <span>privateKey</span>
                                  </div>
                                  <el-input
                                    :disabled="!payConfig[14].open"
                                    v-model="payConfig[14].config.PRIVATE_KEY"
                                  ></el-input>
                                </div>
                                <div class="config-item-content no-padding-left">
                                  <div class="pay-left-title">
                                    <span>签名算法类型</span>
                                    <span>sign Type</span>
                                  </div>
                                  <el-select
                                    :disabled="!payConfig[14].open"
                                    v-model="payConfig[14].config.SIGN_TYPE"
                                  >
                                    <el-option
                                      v-for="item of arithmeticDictionary.abc"
                                      :key="item.id"
                                      :label="item.value"
                                      :value="item.id"
                                    ></el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="payConfig[15].config.SINGLE_PAYMENT==0">
                      <div style="display:flex;">
                        <div
                          style="box-sizing:border-box; width:0.75rem;border-right:0.01rem solid #dcdcdc;padding-top:1rem; padding-left:0.2rem;padding-right:0.2rem"
                        >体检收款</div>
                        <div style="flex:1">
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">支付宝</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[0].edit"
                                    v-model="payConfig[0].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>appID</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[0].open"
                                        v-model="payConfig[0].config.APP_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>公钥</span>
                                        <span>publicKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[0].open"
                                        v-model="payConfig[0].config.PUBLIC_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[0].open"
                                        v-model="payConfig[0].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[0].open"
                                        v-model="payConfig[0].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.apply"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">微信</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[1].edit"
                                    v-model="payConfig[1].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>appID</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[1].open"
                                        v-model="payConfig[1].config.APP_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[1].open"
                                        v-model="payConfig[1].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户收款账号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[1].open"
                                        v-model="payConfig[1].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>退款证书</span>
                                        <span>refundStore</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[1].open"
                                        v-model="payConfig[1].config.KEYSTORE_STR"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>退款证书密钥</span>
                                        <span>refundKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[1].open"
                                        v-model="payConfig[1].config.CERT_PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[1].open"
                                        v-model="payConfig[1].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.wchat"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">银联</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[2].edit"
                                    v-model="payConfig[2].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[2].open"
                                        v-model="payConfig[2].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>终端号</span>
                                        <span>tid</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[2].open"
                                        v-model="payConfig[2].config.TID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>消息来源</span>
                                        <span>msgSrc</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[2].open"
                                        v-model="payConfig[2].config.MSG_SRC"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>来源编号</span>
                                        <span>msgSrcId</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[2].open"
                                        v-model="payConfig[2].config.MSG_SRC_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[2].open"
                                        v-model="payConfig[2].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[2].open"
                                        v-model="payConfig[2].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.unionpay"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">工行</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[3].edit"
                                    v-model="payConfig[3].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[3].open"
                                        v-model="payConfig[3].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>APPID</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[3].open"
                                        v-model="payConfig[3].config.APP_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>档案编号</span>
                                        <span>STORE_CODE</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[3].open"
                                        v-model="payConfig[3].config.STORE_CODE"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[3].open"
                                        v-model="payConfig[3].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>公钥</span>
                                        <span>publicKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[3].open"
                                        v-model="payConfig[3].config.PUBLIC_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[3].open"
                                        v-model="payConfig[3].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.icbc"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">农行</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[4].edit"
                                    v-model="payConfig[4].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[4].open"
                                        v-model="payConfig[4].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>公钥</span>
                                        <span>publicKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[4].open"
                                        v-model="payConfig[4].config.PUBLIC_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[4].open"
                                        v-model="payConfig[4].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[4].open"
                                        v-model="payConfig[4].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.abc"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="display:flex;">
                        <div
                          style="box-sizing:border-box; width:0.75rem;border-top:0.01rem solid #dcdcdc;border-right:0.01rem solid #dcdcdc;padding-top:1rem; padding-left:0.2rem;padding-right:0.2rem"
                        >打印照片收款</div>
                        <div style="flex:1">
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">支付宝</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[5].edit"
                                    v-model="payConfig[5].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>appID</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[5].open"
                                        v-model="payConfig[5].config.APP_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>公钥</span>
                                        <span>publicKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[5].open"
                                        v-model="payConfig[5].config.PUBLIC_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[5].open"
                                        v-model="payConfig[5].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[5].open"
                                        v-model="payConfig[5].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.apply"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">微信</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[6].edit"
                                    v-model="payConfig[6].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>appID</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[6].open"
                                        v-model="payConfig[6].config.APP_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[6].open"
                                        v-model="payConfig[6].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户收款账号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[6].open"
                                        v-model="payConfig[6].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>退款证书</span>
                                        <span>refundStore</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[6].open"
                                        v-model="payConfig[6].config.KEYSTORE_STR"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>退款证书密钥</span>
                                        <span>refundKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[6].open"
                                        v-model="payConfig[6].config.CERT_PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[6].open"
                                        v-model="payConfig[6].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.wchat"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">银联</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[7].edit"
                                    v-model="payConfig[7].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[7].open"
                                        v-model="payConfig[7].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>终端号</span>
                                        <span>tid</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[7].open"
                                        v-model="payConfig[7].config.TID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>消息来源</span>
                                        <span>msgSrc</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[7].open"
                                        v-model="payConfig[7].config.MSG_SRC"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>来源编号</span>
                                        <span>msgSrcId</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[7].open"
                                        v-model="payConfig[7].config.MSG_SRC_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[7].open"
                                        v-model="payConfig[7].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[7].open"
                                        v-model="payConfig[7].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.unionpay"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">工行</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[8].edit"
                                    v-model="payConfig[8].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[8].open"
                                        v-model="payConfig[8].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>APPID</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[8].open"
                                        v-model="payConfig[8].config.APP_ID"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>档案编号</span>
                                        <span>STORE_CODE</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[8].open"
                                        v-model="payConfig[8].config.STORE_CODE"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[8].open"
                                        v-model="payConfig[8].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>公钥</span>
                                        <span>publicKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[8].open"
                                        v-model="payConfig[8].config.PUBLIC_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[8].open"
                                        v-model="payConfig[8].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.icbc"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="config-item">
                            <div class="config-item-label">
                              <span class="left-label">农行</span>
                            </div>
                            <div class="config-item-right">
                              <div class="warp-column-item">
                                <div class="warp-column-label no-border-right">
                                  <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    :disabled="!payConfig[9].edit"
                                    v-model="payConfig[9].open"
                                  ></el-switch>
                                </div>
                                <div class="warp-column-content">
                                  <div class="list-row-item">
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>商户号</span>
                                        <span>partner</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[9].open"
                                        v-model="payConfig[9].config.PARTNER"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>公钥</span>
                                        <span>publicKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[9].open"
                                        v-model="payConfig[9].config.PUBLIC_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>私钥</span>
                                        <span>privateKey</span>
                                      </div>
                                      <el-input
                                        :disabled="!payConfig[9].open"
                                        v-model="payConfig[9].config.PRIVATE_KEY"
                                      ></el-input>
                                    </div>
                                    <div class="config-item-content no-padding-left">
                                      <div class="pay-left-title">
                                        <span>签名算法类型</span>
                                        <span>sign Type</span>
                                      </div>
                                      <el-select
                                        :disabled="!payConfig[9].open"
                                        v-model="payConfig[9].config.SIGN_TYPE"
                                      >
                                        <el-option
                                          v-for="item of arithmeticDictionary.abc"
                                          :key="item.id"
                                          :label="item.value"
                                          :value="item.id"
                                        ></el-option>
                                      </el-select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="上传配置" name="uploadConfig">
                  <div class="pay-config">
                    <div class="config-item border-top">
                      <div class="config-item-label">
                        <span class="left-label">12123</span>
                      </div>
                      <div class="config-item-right">
                        <div class="warp-column-item">
                          <div class="warp-column-label no-border-right">
                            <el-switch
                              :active-value="1"
                              :inactive-value="0"
                              :disabled="!uploadConfig[1].edit"
                              v-model="uploadConfig[1].open"
                            ></el-switch>
                          </div>
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>URL</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[1].open"
                                  v-model="uploadConfig[1].config.URL"
                                ></el-input>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>发证机关</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[1].open"
                                  v-model="uploadConfig[1].config.ORG_NAME"
                                ></el-input>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>接口参数</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[1].open"
                                  v-model="uploadConfig[1].config.PARAM"
                                ></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">六合一</span>
                      </div>
                      <div class="config-item-right">
                        <div class="warp-column-item">
                          <div class="warp-column-label no-border-right">
                            <el-switch
                              :active-value="1"
                              :inactive-value="0"
                              :disabled="!uploadConfig[2].edit"
                              v-model="uploadConfig[2].open"
                            ></el-switch>
                          </div>
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>接口</span>
                                </div>
                                <el-select
                                  :disabled="!uploadConfig[2].open"
                                  v-model="uploadConfig[2].subType"
                                >
                                  <el-option
                                    v-for="item of interfaceType.sixtoone"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                  ></el-option>
                                </el-select>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>URL</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[2].open"
                                  v-model="uploadConfig[2].config.URL"
                                ></el-input>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>设备编码</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[2].open"
                                  v-model="uploadConfig[2].config.DEVICE_CODE"
                                ></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="config-item">
                      <div class="config-item-label">
                        <span class="left-label">支付流水上报</span>
                      </div>
                      <div class="config-item-right">
                        <div class="warp-column-item">
                          <div class="warp-column-label no-border-right">
                            <el-switch
                              :active-value="1"
                              :inactive-value="0"
                              :disabled="!uploadConfig[3].edit"
                              v-model="uploadConfig[3].open"
                            ></el-switch>
                          </div>
                          <div class="warp-column-content">
                            <div class="list-row-item">
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>收款单位ID</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[3].open"
                                  maxlength="4"
                                  v-model="uploadConfig[3].config.dwid"
                                ></el-input>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>设备编码</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[3].open"
                                  maxlength="5"
                                  v-model="uploadConfig[3].config.sbbh"
                                ></el-input>
                              </div>
                              <div class="config-item-content no-padding-left">
                                <div class="pay-left-title">
                                  <span>URL</span>
                                </div>
                                <el-input
                                  :disabled="!uploadConfig[3].open"
                                  maxlength="200"
                                  v-model="uploadConfig[3].config.url"
                                ></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="template-right-part flex">
              <div class="role-tree">
                <div class="common-title">
                  <i class="descri"></i>
                  <span class="title-font">将模板绑定到设备</span>
                </div>
                <div class="tree-parent">
                  <el-scrollbar class="role-scroll">
                    <el-tree
                      ref="userDeviceTree"
                      class="tree-content"
                      show-checkbox
                      :data="userDeviceList"
                      :props="props1"
                      :node-key="props1.value"
                      default-expand-all
                    >
                      <div class="custom-node" slot-scope="{ node, data }">
                        <span v-show="data.type != 2" class="node-text">{{ node.label }}</span>
                        <span v-show="data.type == 2" class="node-text">{{ data.devicePlace }}</span>
                        <span class="node-text device-place" v-show="data.type == 2">{{data.name}}</span>
                      </div>
                    </el-tree>
                  </el-scrollbar>
                </div>
              </div>
            </div>
          </div>
          <div class="flex center-buttons">
            <el-button
              type="primary"
              size="small"
              :loading="saveLoading"
              @click="handleConfigTempleteSave"
            >确定</el-button>
            <el-button size="small" @click="handleTemplateList">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { getUserDeviceTree } from '@/api/user.js'
import { editTemplate, getTemplateList, getTemplateDetail } from '@/api/template.js'
import { areaSelect, getSchoolList } from '@/api/common.js'

export default {
  components: {
    wxHeader
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  data () {
    return {
      provinceList: [],
      cityList: [],
      districtList: [],
      schoolList: [],
      activeName: 'baseConfig',
      saveLoading: false,
      interfaceType: {
        'sixtoone': [
          {
            id: 1,
            value: '六合一'
          },
          {
            id: 3,
            value: '网影六合一'
          }
        ],
        '12123': [
          {
            id: 2,
            value: '12123'
          },
          {
            id: 4,
            value: '网影12123'
          }
        ]
      },
      arithmeticDictionary: {
        'apply': [
          {
            id: 'RSA',
            value: 'RSA'
          },
          {
            id: 'RSA2',
            value: 'RSA2'
          }
        ],
        'wchat': [
          {
            id: 'HMACSHA256',
            value: 'HMACSHA256'
          },
          {
            id: 'MD5',
            value: 'MD5'
          }
        ],
        'unionpay': [
          {
            id: 'SHA256',
            value: 'SHA256'
          },
          {
            id: 'MD5',
            value: 'MD5'
          }
        ],
        'icbc': [
          {
            id: 'RSA',
            value: 'RSA'
          },
          {
            id: 'RSA2',
            value: 'RSA2'
          }
        ],
        'abc': [
          {
            id: 'RSA',
            value: 'RSA'
          }
        ]
      },
      template: {
        name: '',
        describe: '',
        rules: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ]
        }
      },
      uploadConfig: {
        1: {
          type: 1,
          subType: 4,
          edit: 1,
          open: 1,
          config: {
            URL: '',
            ORG_NAME: '',
            PARAM: ''
          }
        },
        2: {
          type: 2,
          subType: 1,
          edit: 1,
          open: 1,
          config: {
            URL: '',
            DEVICE_CODE: ''
          }
        },
        3: {
          type: 3,
          edit: 1,
          open: 1,
          config: {
            dwid: '',
            sbbh: '',
            url: ''
          }
        }
      },
      payConfig: {
        0: {
          channel: 0,
          type: 'HEALTH_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            APP_ID: '',
            PUBLIC_KEY: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        1: {
          channel: 1,
          type: 'HEALTH_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            APP_ID: '',
            PRIVATE_KEY: '',
            PARTNER: '',
            SIGN_TYPE: '',
            KEYSTORE_STR: '',
            CERT_PRIVATE_KEY: ''
          }
        },
        2: {
          channel: 2,
          type: 'HEALTH_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            TID: '',
            MSG_SRC: '',
            MSG_SRC_ID: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        3: {
          channel: 3,
          type: 'HEALTH_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            APP_ID: '',
            STORE_CODE: '',
            PUBLIC_KEY: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        4: {
          channel: 4,
          type: 'HEALTH_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            PRIVATE_KEY: '',
            PUBLIC_KEY: '',
            SIGN_TYPE: ''
          }
        },
        5: {
          channel: 0,
          type: 'PHOTO_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            APP_ID: '',
            PUBLIC_KEY: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        6: {
          channel: 1,
          type: 'PHOTO_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            APP_ID: '',
            PRIVATE_KEY: '',
            PARTNER: '',
            SIGN_TYPE: '',
            KEYSTORE_STR: '',
            CERT_PRIVATE_KEY: ''
          }
        },
        7: {
          channel: 2,
          type: 'PHOTO_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            TID: '',
            MSG_SRC: '',
            MSG_SRC_ID: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        8: {
          channel: 3,
          type: 'PHOTO_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            APP_ID: '',
            STORE_CODE: '',
            PUBLIC_KEY: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        9: {
          channel: 4,
          type: 'PHOTO_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            PRIVATE_KEY: '',
            PUBLIC_KEY: '',
            SIGN_TYPE: ''
          }
        },
        10: {
          channel: 0,
          type: 'SINGLE_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            APP_ID: '',
            PUBLIC_KEY: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        11: {
          channel: 1,
          type: 'SINGLE_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            APP_ID: '',
            PRIVATE_KEY: '',
            PARTNER: '',
            SIGN_TYPE: '',
            KEYSTORE_STR: '',
            CERT_PRIVATE_KEY: ''
          }
        },
        12: {
          channel: 2,
          type: 'SINGLE_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            TID: '',
            MSG_SRC: '',
            MSG_SRC_ID: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        13: {
          channel: 3,
          type: 'SINGLE_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            APP_ID: '',
            STORE_CODE: '',
            PUBLIC_KEY: '',
            PRIVATE_KEY: '',
            SIGN_TYPE: ''
          }
        },
        14: {
          channel: 4,
          type: 'SINGLE_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PARTNER: '',
            PRIVATE_KEY: '',
            PUBLIC_KEY: '',
            SIGN_TYPE: ''
          }
        },
        15: {
          channel: 0,
          type: 'PAYMENT_WAY',
          edit: 1,
          open: 1,
          config: {
            SINGLE_PAYMENT: 1
          }
        }
      },
      healthConfig: {
        COMPARED_THRESHOLD: {
          edit: 0,
          type: 'COMPARED_THRESHOLD',
          config: 60
        },
        EYE_DETECTION: {
          type: 'EYE_DETECTION',
          config: {
            '5.0': {
              TYPEAB_TARGETS_LARGE: {
                open: 1,
                edit: 1,
                check: 1,
                count: 1
              },
              TYPEAB_TARGETS_MIDDLE: {
                open: 1,
                edit: 1,
                check: 1,
                count: 1
              },
              TYPEAB_TARGETS_49: {
                open: 1,
                edit: 1,
                check: 1,
                count: 3
              },
              TYPEAB_TARGETS_50: {
                open: 1,
                edit: 1,
                check: 1,
                count: 3
              }
            },
            '4.9': {
              TYPEAB_TARGETS_LARGE: {
                open: 1,
                edit: 1,
                check: 1,
                count: 1
              },
              TYPEAB_TARGETS_MIDDLE: {
                open: 1,
                edit: 1,
                check: 1,
                count: 1
              },
              TYPEAB_TARGETS_49: {
                open: 1,
                edit: 1,
                check: 1,
                count: 3
              },
              TYPEAB_TARGETS_50: {
                open: 1,
                edit: 1,
                check: 1,
                count: 3
              }
            }
          }
        },
        COLOR_RECOGNITION_TESTING: {
          type: 'COLOR_RECOGNITION_TESTING',
          config: {
            SIMPLE: {
              NUM_PIC: {
                open: 1,
                edit: 1,
                check: 1,
                count: 2
              },
              GRAPHICS_PIC: {
                open: 1,
                edit: 1,
                check: 1,
                count: 2
              }
            },
            COMPLEX: {
              NUM_PIC: {
                open: 0,
                edit: 0,
                check: 0,
                count: 0
              },
              GRAPHICS_PIC: {
                open: 0,
                edit: 0,
                check: 0,
                count: 0
              }
            }
          }
        },
        VOICE_TIME: {
          type: 'VOICE_TIME',
          config: 3
        },
        VOICE_REPEAT_TIME: {
          type: 'VOICE_REPEAT_TIME',
          edit: 1,
          open: 1,
          config: 3
        },
        SIT_POSITIVE: {
          type: 'SIT_POSITIVE',
          edit: 0,
          open: 1
        },
        HINT_TURN_AROUND: {
          type: 'HINT_TURN_AROUND',
          edit: 0,
          open: 1
        },
        HINT_ROTATE_HANDS: {
          type: 'HINT_ROTATE_HANDS',
          edit: 0,
          open: 1
        },
        HINT_FIST: {
          type: 'HINT_FIST',
          edit: 0,
          open: 1
        },
        MEASURING_HEIGHT: {
          type: 'MEASURING_HEIGHT',
          edit: 0,
          open: 1
        },
        REMEASURING_HEIGHT: {
          type: 'REMEASURING_HEIGHT',
          edit: 0,
          open: 1
        },
        HINT_LEG_LIFT: {
          type: 'HINT_LEG_LIFT',
          edit: 0,
          open: 1
        },
        PROSTHESIS_DETECTION_OF_INFRARED: {
          type: 'PROSTHESIS_DETECTION_OF_INFRARED',
          edit: 1,
          open: 0
        }
      },
      baseConfig: {
        HEALTH_FUNCTION: {
          type: 'HEALTH_FUNCTION',
          edit: 1,
          open: 1,
          config: {
            EYESIGHT_TESTING: 1,
            COLOR_RECOGNITION_TESTING: 1,
            LISTENING_TESTING: 1,
            TRUNK_LIMBS_TESTING: 1
          }
        },
        CAMERA_FUNCTION: {
          type: 'CAMERA_FUNCTION',
          edit: 1,
          open: 1,
          config: 3
        },
        IS_ONLY_HEALTH: {
          type: 'IS_ONLY_HEALTH',
          edit: 1,
          open: 1
        },
        MULTI_PERSON_USE: {
          type: 'MULTI_PERSON_USE',
          edit: 1,
          open: 1
        },
        OPEN_DOOR: {
          type: 'OPEN_DOOR',
          edit: 1,
          open: 1
        },
        HEALTH_LIGHT: {
          type: 'HEALTH_LIGHT',
          edit: 1,
          open: 0
        },
        HEALTH_PRINT_PHOTO: {
          type: 'HEALTH_PRINT_PHOTO',
          edit: 1,
          open: 1
        },
        APPLY_LICENSE: {
          type: 'APPLY_LICENSE',
          config: '申领驾照(新学员)体检',
          edit: 0,
          open: 1
        },
        REAPPLY_LICENSE: {
          type: 'REAPPLY_LICENSE',
          config: '换证体检',
          edit: 0,
          open: 1
        },
        ANNUAL_LICENSE: {
          type: 'ANNUAL_LICENSE',
          config: '年审体检',
          edit: 0,
          open: 1
        },
        INCREASES_LICENSE: {
          type: 'INCREASES_LICENSE',
          config: '增驾体检',
          edit: 0,
          open: 1
        },
        DECREASES_LICENSE: {
          type: 'DECREASES_LICENSE',
          config: '降级换证体检',
          edit: 0,
          open: 1
        },
        DEFAULT_DRIVER_SCHOOL: {
          type: 'DEFAULT_DRIVER_SCHOOL',
          edit: 0,
          open: 1,
          config: {
            PROVINCE_CODE: '',
            CITY_CODE: '',
            DISTRICT_CODE: '',
            SCHOOL_CODE: ''
          }
        },
        IS_CONFIRMRESULT: {
          type: 'IS_CONFIRMRESULT',
          edit: 1,
          open: 1
        },
        IS_DECLARATION: {
          type: 'IS_DECLARATION',
          edit: 1,
          open: 1
        },
        IS_SIGNATURE: {
          type: 'IS_SIGNATURE',
          edit: 1,
          open: 1
        },
        PAYMENT: {
          type: 'PAYMENT',
          edit: 1,
          open: 1,
          config: {
            HEALTH_PRICE: '0.01',
            PHOTO_PRICE: '0.02'
          }
        },
        CAMERA_FUNCTION_PAYMENT: {
          type: 'CAMERA_FUNCTION_PAYMENT',
          edit: 1,
          open: 1,
          config: {
            PRICE: '0.01'
          }
        },
        PRINT_RECEIPT: {
          type: 'PRINT_RECEIPT',
          edit: 1,
          open: 1,
          config: {
            EDIT: 0,
            AUTO: '手动打印'
          }
        },
        PRINT_REPORT: {
          type: 'PRINT_REPORT',
          edit: 1,
          open: 0
        },
        PRINT_PHOTO: {
          type: 'PRINT_PHOTO',
          edit: 1,
          open: 1
        },
        HEALTH_COUNT: {
          type: 'HEALTH_COUNT',
          edit: 1,
          open: 1,
          config: 10
        },
        AUTO_UPDATE_TIME: {
          type: 'AUTO_UPDATE_TIME',
          edit: 0,
          open: 0,
          config: new Date(2019, 1, 1, 18, 0, 0)
        },
        AUTO_APPROVE: {
          type: 'AUTO_APPROVE',
          edit: 1,
          open: 0,
          config: {
            startTime: '00:00:00',
            endTime: '23:59:59'
          }
        },
        FAIL_MESSAGE: {
          type: 'FAIL_MESSAGE',
          edit: 1,
          open: 1,
          config: {
            VALUE: '体检未达到驾考要求,系统即将自动退出',
            LABEL: ''
          }
        },
        POP_WINDOW_TIME: {
          type: 'POP_WINDOW_TIME',
          edit: 1,
          open: 1,
          config: 10
        }
      },
      deviceIdList: [],
      userDeviceList: [],
      props1: {
        value: 'id',
        label: function (data, node) {
          return data.name
        },
        disabled: function (data, node) {
          return data.type == 1 || data.deviceType == 1 // type: 1-用户， 2-设备; deviceType: 1-已有模板 0-未被使用
        },
        children: 'children'
      },
      templateId: ''
    }
  },
  methods: {
    handleTimeValidate () {
      this.$nextTick(() => {
        this.baseConfig.POP_WINDOW_TIME.config = Number(this.baseConfig.POP_WINDOW_TIME.config.replace(/[^\d]/g, ''))

        if (this.baseConfig.POP_WINDOW_TIME.config > 120) {
          this.baseConfig.POP_WINDOW_TIME.config = 120
        }
      })
    },
    handleConfigTempleteSave () {
      let word = this.templateId ? '更新' : '新建'

      // 检验form表单
      this.$refs.templateForm.validate(valid => {
        if (valid) {
          // 校验默认驾校不能为空
          if (!this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.CITY_CODE ||
            !this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE ||
            !this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.PROVINCE_CODE ||
            !this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.SCHOOL_CODE) {
            this.$message.warning('默认驾校不能为空')
            return
          }
          if (!this.baseConfig.APPLY_LICENSE.open &&
            !this.baseConfig.REAPPLY_LICENSE.open &&
            !this.baseConfig.ANNUAL_LICENSE.open &&
            !this.baseConfig.INCREASES_LICENSE.open &&
            !this.baseConfig.DECREASES_LICENSE.open) {
            this.$message.warning('修改失败,请保证至少开启一项体检业务')
            return
          }
          if (!this.healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].GRAPHICS_PIC.check &&
            !this.healthConfig.COLOR_RECOGNITION_TESTING.config['SIMPLE'].NUM_PIC.check) {
            this.$message.warning('辨色力检测不能为空')
            return
          }
          // 校验体检不合格提示
          if (this.baseConfig.FAIL_MESSAGE.config.VALUE == 3 && !this.baseConfig.FAIL_MESSAGE.config.LABEL) {
            this.$message.warning('请输入自定义体检不合格提示')
            return
          } else if (this.baseConfig.FAIL_MESSAGE.config.VALUE != 3) {
            this.baseConfig.FAIL_MESSAGE.config.LABEL = ''
          }
          var startTime = this.baseConfig.AUTO_APPROVE.config.startTime
          var endTime = this.baseConfig.AUTO_APPROVE.config.endTime

          if (startTime && endTime) {
            if (startTime == endTime) {
              console.log(startTime)
              this.$message.warning('自动审核开始时间与结束时间相同')
              return
            }
          }

          // 右侧设备树选中数据
          this.deviceIdList = []
          let checkNodes = this.$refs.userDeviceTree.getCheckedNodes()
          checkNodes.forEach(item => {
            this.deviceIdList.push(item.id)
          })

          const loading = this.$loading({
            lock: true,
            text: '加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)',
            target: document.querySelector('tbody')
          })
          this.$confirm('您的本次操作可能对用户体检带来影响, 请问您确定要变更配置吗?', '提示', {
            confirmButtonClass: 'redButton',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            editTemplate({
              template: {
                id: this.templateId ? this.templateId : '',
                name: this.template.name,
                remark: this.template.remark
              },
              healthConfigList: Object.values(this.healthConfig),
              featuresConfigList: Object.values(this.baseConfig),
              paymentConfigList: Object.values(this.payConfig),
              cascadeConfigList: Object.values(this.uploadConfig),
              deviceIdList: this.deviceIdList
            }).then(res => {
              loading.close()
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  duration: 2000,
                  message: word + '配置模板成功！',
                  onClose: () => {
                    this.handleTemplateList()
                  }
                })
              }
            }).catch(() => {
              loading.close()
            })
          }).catch(() => {
            loading.close()
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      })
    },
    changePhotoState () {
      if (this.baseConfig.HEALTH_PRINT_PHOTO.open) {
        this.baseConfig.PRINT_PHOTO.open = 1
      }
    },
    handleCFChange () {
      // 关闭 "仅照相" 按钮需联动关闭 "打印照片" 按钮
      if (this.baseConfig.CAMERA_FUNCTION.open) {
        this.baseConfig.PRINT_PHOTO.open = 1
      }
    },
    handlePPChange () {
      // 关闭 "打印照片" 按钮需联动关闭 "仅照相" 按钮
      if (!this.baseConfig.PRINT_PHOTO.open) {
        this.baseConfig.CAMERA_FUNCTION.open = 0
      }
      if (!this.baseConfig.PRINT_PHOTO.open) {
        this.baseConfig.HEALTH_PRINT_PHOTO.open = 0
      }
    },
    handleTabClick () { },
    handleTemplateList () {
      this.$router.push({
        name: 'templeteList'
      })
    },
    getAreaList (param, type) {
      // 加载省市区列表
      areaSelect(param).then((res) => {
        if (res.code == 0) {
          if (type == 'province') {
            this.provinceList = res.data.list
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.CITY_CODE = ''
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE = ''
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.SCHOOL_CODE = ''
            this.cityList = []
            this.districtList = []
            this.schoolList = []
          } else if (type == 'city') {
            this.cityList = res.data.list
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.CITY_CODE = ''
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE = ''
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.SCHOOL_CODE = ''
            this.districtList = []
            this.schoolList = []
          } else if (type == 'district') {
            this.districtList = res.data.list
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE = ''
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.SCHOOL_CODE = ''
            this.schoolList = []
          }
        }
      })
    },
    updateList (type) {
      if (type == 'province') {
        this.getAreaList({
          pid: 0
        }, type)
      } else if (type == 'city') {
        this.getAreaList({
          pid: this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.PROVINCE_CODE
        }, type)
      } else if (type == 'district') {
        this.getAreaList({
          pid: this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.CITY_CODE
        }, type)
      } else if (type == 'school') {
        getSchoolList({
          parentCode: this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE
        }).then((res) => {
          if (res.code == 0) {
            this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.SCHOOL_CODE = ''
            this.schoolList = res.data.list
          }
        })
      }
    }
  },
  created () {
    this.templateId = this.$route.query.templateId

    getUserDeviceTree({
      templateId: this.templateId ? this.templateId : ''
    }).then((res) => {
      if (res.code == 0) {
        this.userDeviceList = res.data
      }
    })

    areaSelect({
      pid: 0
    }).then((res) => {
      if (res.code == 0) {
        this.provinceList = res.data.list
        // 加载详情信息
        if (this.templateId) {
          getTemplateDetail({
            templateId: this.templateId
          }).then(res => {
            if (res.code == 0) {
              // 模板基础信息
              this.$set(this.template, 'name', res.data.template.name)
              this.$set(this.template, 'remark', res.data.template.remark)

              // 模板配置信息
              this.$set(this.baseConfig, 'ANNUAL_LICENSE', res.data.featuresConfig.ANNUAL_LICENSE)
              this.$set(this.baseConfig, 'APPLY_LICENSE', res.data.featuresConfig.APPLY_LICENSE)
              this.$set(this.baseConfig, 'AUTO_APPROVE', res.data.featuresConfig.AUTO_APPROVE)
              this.$set(this.baseConfig, 'AUTO_UPDATE_TIME', res.data.featuresConfig.AUTO_UPDATE_TIME)
              this.$set(this.baseConfig, 'CAMERA_FUNCTION', res.data.featuresConfig.CAMERA_FUNCTION)
              this.$set(this.baseConfig, 'IS_ONLY_HEALTH', res.data.featuresConfig.IS_ONLY_HEALTH)
              this.$set(this.baseConfig, 'HEALTH_COUNT', res.data.featuresConfig.HEALTH_COUNT)
              this.$set(this.baseConfig, 'HEALTH_FUNCTION', res.data.featuresConfig.HEALTH_FUNCTION)
              this.$set(this.baseConfig, 'INCREASES_LICENSE', res.data.featuresConfig.INCREASES_LICENSE)
              this.$set(this.baseConfig, 'DECREASES_LICENSE', res.data.featuresConfig.DECREASES_LICENSE)
              this.$set(this.baseConfig, 'DEFAULT_DRIVER_SCHOOL', res.data.featuresConfig.DEFAULT_DRIVER_SCHOOL)
              this.$set(this.baseConfig, 'IS_CONFIRMRESULT', res.data.featuresConfig.IS_CONFIRMRESULT)
              this.$set(this.baseConfig, 'IS_DECLARATION', res.data.featuresConfig.IS_DECLARATION)
              this.$set(this.baseConfig, 'IS_SIGNATURE', res.data.featuresConfig.IS_SIGNATURE)
              this.$set(this.baseConfig, 'MULTI_PERSON_USE', res.data.featuresConfig.MULTI_PERSON_USE)
              this.$set(this.baseConfig, 'OPEN_DOOR', res.data.featuresConfig.OPEN_DOOR)
              this.$set(this.baseConfig, 'HEALTH_LIGHT', res.data.featuresConfig.HEALTH_LIGHT)
              this.$set(this.baseConfig, 'PAYMENT', res.data.featuresConfig.PAYMENT)
              this.$set(this.baseConfig, 'CAMERA_FUNCTION_PAYMENT', res.data.featuresConfig.CAMERA_FUNCTION_PAYMENT)
              this.$set(this.baseConfig, 'HEALTH_PRINT_PHOTO', res.data.featuresConfig.HEALTH_PRINT_PHOTO)
              this.$set(this.baseConfig, 'PRINT_PHOTO', res.data.featuresConfig.PRINT_PHOTO)
              this.$set(this.baseConfig, 'PRINT_RECEIPT', res.data.featuresConfig.PRINT_RECEIPT)
              this.$set(this.baseConfig, 'PRINT_REPORT', res.data.featuresConfig.PRINT_REPORT)
              this.$set(this.baseConfig, 'REAPPLY_LICENSE', res.data.featuresConfig.REAPPLY_LICENSE)
              this.$set(this.baseConfig, 'FAIL_MESSAGE', res.data.featuresConfig.FAIL_MESSAGE)
              this.$set(this.baseConfig, 'POP_WINDOW_TIME', res.data.featuresConfig.POP_WINDOW_TIME)

              this.$set(this.healthConfig, 'COLOR_RECOGNITION_TESTING', res.data.healthConfig.COLOR_RECOGNITION_TESTING)
              res.data.healthConfig.COMPARED_THRESHOLD.config = res.data.healthConfig.COMPARED_THRESHOLD.config * 1
              this.$set(this.healthConfig, 'COMPARED_THRESHOLD', res.data.healthConfig.COMPARED_THRESHOLD)
              this.$set(this.healthConfig, 'EYE_DETECTION', res.data.healthConfig.EYE_DETECTION)
              this.$set(this.healthConfig, 'HINT_FIST', res.data.healthConfig.HINT_FIST)
              this.$set(this.healthConfig, 'HINT_LEG_LIFT', res.data.healthConfig.HINT_LEG_LIFT)
              this.$set(this.healthConfig, 'PROSTHESIS_DETECTION_OF_INFRARED', res.data.healthConfig.PROSTHESIS_DETECTION_OF_INFRARED)
              this.$set(this.healthConfig, 'HINT_ROTATE_HANDS', res.data.healthConfig.HINT_ROTATE_HANDS)
              this.$set(this.healthConfig, 'HINT_TURN_AROUND', res.data.healthConfig.HINT_TURN_AROUND)
              this.$set(this.healthConfig, 'MEASURING_HEIGHT', res.data.healthConfig.MEASURING_HEIGHT)
              this.$set(this.healthConfig, 'REMEASURING_HEIGHT', res.data.healthConfig.REMEASURING_HEIGHT)
              this.$set(this.healthConfig, 'SIT_POSITIVE', res.data.healthConfig.SIT_POSITIVE)
              this.$set(this.healthConfig, 'VOICE_REPEAT_TIME', res.data.healthConfig.VOICE_REPEAT_TIME)
              this.$set(this.healthConfig, 'VOICE_TIME', res.data.healthConfig.VOICE_TIME)
              this.$set(this.healthConfig, 'HINT_TURN_AROUND', res.data.healthConfig.HINT_TURN_AROUND)
              // 分账收款
              this.$set(this.payConfig, '0', res.data.paymentConfig['HEALTH_PAYMENT:0'])
              this.$set(this.payConfig, '1', res.data.paymentConfig['HEALTH_PAYMENT:1'])
              this.$set(this.payConfig, '2', res.data.paymentConfig['HEALTH_PAYMENT:2'])
              this.$set(this.payConfig, '3', res.data.paymentConfig['HEALTH_PAYMENT:3'])
              this.$set(this.payConfig, '4', res.data.paymentConfig['HEALTH_PAYMENT:4'])
              this.$set(this.payConfig, '5', res.data.paymentConfig['PHOTO_PAYMENT:0'])
              this.$set(this.payConfig, '6', res.data.paymentConfig['PHOTO_PAYMENT:1'])
              this.$set(this.payConfig, '7', res.data.paymentConfig['PHOTO_PAYMENT:2'])
              this.$set(this.payConfig, '8', res.data.paymentConfig['PHOTO_PAYMENT:3'])
              this.$set(this.payConfig, '9', res.data.paymentConfig['PHOTO_PAYMENT:4'])
              // 统一收款
              this.$set(this.payConfig, '10', res.data.paymentConfig['SINGLE_PAYMENT:0'])
              this.$set(this.payConfig, '11', res.data.paymentConfig['SINGLE_PAYMENT:1'])
              this.$set(this.payConfig, '12', res.data.paymentConfig['SINGLE_PAYMENT:2'])
              this.$set(this.payConfig, '13', res.data.paymentConfig['SINGLE_PAYMENT:3'])
              this.$set(this.payConfig, '14', res.data.paymentConfig['SINGLE_PAYMENT:4'])

              this.$set(this.payConfig, '15', res.data.paymentConfig.PAYMENT_WAY)

              this.$set(this.uploadConfig, '1', res.data.cascadeConfig[1])
              this.$set(this.uploadConfig, '2', res.data.cascadeConfig[2])
              this.$set(this.uploadConfig, '3', res.data.cascadeConfig[3])
              // 模板使用机器信息
              this.$refs.userDeviceTree.setCheckedKeys(res.data.deviceIdList)

              if (this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.PROVINCE_CODE) {
                areaSelect({
                  pid: this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.PROVINCE_CODE
                }).then((res) => {
                  if (res.code == 0) {
                    this.cityList = res.data.list
                  }
                })
              }

              if (this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.CITY_CODE) {
                areaSelect({
                  pid: this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.CITY_CODE
                }).then((res) => {
                  if (res.code == 0) {
                    this.districtList = res.data.list
                  }
                })
              }

              if (this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE) {
                getSchoolList({
                  parentCode: this.baseConfig.DEFAULT_DRIVER_SCHOOL.config.DISTRICT_CODE
                }).then((res) => {
                  if (res.code == 0) {
                    this.schoolList = res.data.list
                  }
                })
              }
            }
          })
        }
      }
    })
  }
}
</script>

<style lang="scss">
.yw-type {
  .el-input__inner {
    font-size: 12px;
  }
}
.check-style {
  .el-radio__label {
    font-size: 12px;
  }
}
.photo-checkbox-style {
  .el-checkbox__label {
    font-size: 12px;
  }
}
.pay-tj {
  .el-checkbox__label {
    font-size: 12px;
  }
}
.right-pz {
  .el-radio__label {
    font-size: 12px;
  }
}
.zd-input {
  textarea {
    &::-webkit-input-placeholder {
      font-size: 12px;
    }
    &::-moz-placeholder {
      font-size: 16px;
    }
    &:-ms-input-placeholder {
      font-size: 12px;
    }
  }
}
.pxState {
  padding: 0.3rem 0 !important;
}
.payMethod-box {
  .warp-column-item {
    border-bottom: 0 !important;
  }
}
.hb-add-templete {
  background-color: #edeef2;
  .custom-node {
    display: flex;
    flex-direction: column;
    line-height: 22px;
    .device-place {
      font-size: 12px;
      color: #999999;
    }
    .device-place:hover {
      color: #fd7715;
    }
  }
  .el-tree-node__content:hover {
    .device-place {
      color: #fd7715;
    }
  }
  .el-tree-node__content {
    line-height: 28px;
    height: auto;
  }
  .role-tree {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    padding: 0 18px 18px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .common-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      line-height: 16px;
      flex: 0 0 56px;
      .descri {
        width: 4px;
        height: 16px;
        background-color: #fd7715;
        display: inline-block;
        margin-right: 9px;
        vertical-align: text-top;
      }
    }
    .tree-parent {
      height: calc(100% - 56px);
      .role-scroll {
        height: 100%;
        .el-tree-node__expand-icon {
          color: #333;
        }
        .el-tree-node__expand-icon.is-leaf {
          color: transparent;
        }
        .el-tree-node:focus > .el-tree-node__content {
          background-color: #fff1e7;
          color: #fd7715;
        }
        .el-tree-node__content:hover {
          background-color: #fff1e7;
          color: #fd7715;
        }
      }
    }
  }
  .photo-number {
    margin: 0 12px;
    .el-input__inner {
      font-size: 12px;
    }
  }
  .el-tabs__content {
    overflow: auto;
    flex: 1;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__header {
    margin: 0 6px 0 0;
    flex: 0 0 60px;
  }
  .el-tabs__active-bar {
    bottom: 12px;
  }
  .el-tabs__nav {
    height: 60px;
    line-height: 60px;
  }
  .el-tabs__item.is-disabled {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    width: 126px;
    text-align: center;
    padding: 0px;
    text-indent: 13px;
  }
  .el-tabs__item.is-disabled::before {
    content: "";
    position: absolute;
    left: 25px;
    bottom: 13px;
    width: 4px;
    height: 16px;
    background-color: #fd7715;
    z-index: 1;
  }
  .el-form-item__label {
    font-size: 12px;
    color: #666666;
  }
  .el-form-item__content {
    font-size: 12px;
    .reset-input {
      width: 325px;
    }
  }
  .select-form {
    width: 100%;
  }
  .radio-form {
    display: flex;
    justify-content: space-between;
    margin-top: 13px;
  }
  .el-textarea .el-input__count {
    line-height: normal;
  }
}
.config-templete-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-form {
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 16px;
    padding-top: 10px;
    box-sizing: border-box;
    flex: 0 0 134px;
  }
  .config-tabs {
    border-radius: 4px;
    background: #ffffff;
  }
  .tabs-flex {
    flex: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .el-input__icon {
      line-height: 24px !important;
    }
  }
  .config-templete-top {
    overflow: hidden;
    flex: auto;
  }
  .border-top {
    border-top: 1px solid #dcdcdc !important;
  }
  .pay-config {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .pay-config {
    .el-input__icon {
      line-height: 24px;
    }
    .el-input {
      margin: 0 21px 0 28px;
      width: 202px;
      .el-input__inner {
        width: 201px;
        height: 24px !important;
        line-height: 24px;
        border-radius: 4px;
        border: solid 1px #dcdcdc;
      }
    }
  }
  .base-config {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .el-input {
      margin: 0 21px 0 28px;
      width: 202px;
      .el-input__inner {
        width: 201px;
        height: 24px;
        line-height: 24px;
        border-radius: 4px;
        border: solid 1px #dcdcdc;
      }
    }
    .pop-up-time {
      .el-input {
        width: 60px;
        .el-input__inner {
          width: 60px;
        }
      }
    }
    .el-textarea {
      margin-left: 32px;
      width: 300px;
    }
    #defaultds {
      .el-select {
        width: 85px !important;
        margin-left: 10px;
        &.first-select {
          margin-left: 28px;
        }
        &.last-select {
          width: 126px !important;
          .el-input {
            width: 126px !important;
            .el-input__inner {
              width: 126px !important;
            }
          }
        }
        .el-input {
          width: 85px !important;
          margin: 0;
          .el-input__inner {
            padding: 0 0 0 10px !important;
            height: 24px !important;
            line-height: 24px !important;
            width: 85px !important;
          }
          .el-input__icon {
            line-height: 24px;
          }
        }
      }
    }
    .el-select {
      width: 60px !important;
      .el-input {
        width: 60px !important;
        margin: 0;
        .el-input__inner {
          padding: 0 0 0 15px !important;
          height: 24px !important;
          line-height: 24px !important;
          width: 60px !important;
        }
        .el-input__icon {
          line-height: 24px;
        }
      }
    }
  }
  .config-item {
    display: flex;
    border: 1px solid #dcdcdc;
    min-height: 40px;
    border-top: none;
    border-left: none;
    border-right: none;
    .pay-method {
      margin: 0.1rem 0;
      padding-left: 0.1rem;
    }
    .config-item-label {
      width: 125px;
      min-width: 125px;
      border-right: 1px solid #dcdcdc;
      display: flex;
      justify-content: center;
      align-items: center;
      .left-label {
        font-size: 12px;
        color: #333333;
        font-weight: bold;
      }
    }
    .config-item-column-content {
      padding: 15px 32px;
    }
    .no-border-right {
      border-right: none !important;
    }
    .no-margin-left {
      margin-left: 0 !important;
    }
    .no-padding-left {
      padding-left: 0 !important;
    }
    .config-item-content {
      display: flex;
      align-items: center;
      padding-left: 32px;
      margin: 10px 0;
      position: relative;
      .el-input__inner {
        font-size: 12px;
      }
      .el-range-editor.el-input__inner {
        padding: 0.01rem 0.1rem;
      }
      .config-item-part {
        width: 1rem;
        padding: 0.12rem 0;
        border-right: 0.01rem solid #dcdcdc;
        text-align: center;
      }
      .business-icon {
        position: absolute;
        left: 300px;
      }
      .pay-left-title {
        display: flex;
        flex-direction: column;
        width: 90px;
        span {
          text-align: right;
        }
      }
      .el-checkbox {
        margin-right: 21px;
      }
      .slider-con {
        width: 180px;
        margin-left: 15px;
        margin-right: 20px;
      }
      .slider-describe {
        font-size: 12px;
        color: #999999;
        line-height: 15px;
      }
      .check-pay-title {
        margin-left: 70px;
      }
      .pay-type-title {
        margin-left: 70px;
      }
      .label-right-margin {
        margin-right: 20px;
      }
      .config-description {
        margin-left: 32px;
      }
      .config-small-description {
        color: #cccccc;
      }
    }
    .config-item-right {
      display: flex;
      flex-direction: column;
      flex: 1;
      .el-radio {
        margin-top: 14px;
        display: flex;
        align-items: flex-start;
      }
      .radio-content {
        display: flex;
      }
    }
    .warp-column-item {
      display: flex;
      border-bottom: 1px solid #dcdcdc;
      .warp-column-label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        flex: 0 0 auto;
        border-right: 1px solid #dcdcdc;
        .line-break {
          word-break: break-all;
          width: 30px;
        }
      }
      .warp-column-content {
        padding: 12px 24px;
      }
    }
  }
}
.coding-left-part {
  flex: 6;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.template-right-part {
  flex: 4;
  margin-left: 20px;
  .coding-add-buttons {
    display: flex;
    flex-direction: column;
    margin-right: 17px;
    .el-button + .el-button {
      margin: 26px 0 0 0;
    }
  }
}
.code-area {
  height: 139px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #dcdcdc;
  align-items: center;
  .create-code-button {
    width: 103px;
    margin-top: 22px;
  }
  .device-code {
    font-size: 20px;
    color: #333333;
    margin-top: 5px;
    position: relative;
    top: 5px;
  }
  .code-content {
    width: 264px;
    margin-top: 20px;
    height: 20px;
    display: flex;
    .code-itme-bg {
      width: 7px;
      height: 20px;
      background-color: #ededed;
      margin-right: 8px;
    }
    .code-sperate {
      margin-right: 8px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
  .create-code-tip {
    font-size: 12px;
    color: #333333;
  }
}
.center-buttons {
  justify-content: center;
  margin-top: 20px;
  flex: 0 0 32px;
}
.create-manufacturer {
  width: 373px;
  height: 235px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border: solid 1px #dcdcdc;
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-form-item__content {
    font-size: 12px;
    width: 275px;
  }
}
.create-model {
  width: 373px;
  height: 132px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border: solid 1px #dcdcdc;
  .input-con {
    width: 271px;
    height: 34px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    display: flex;
    align-items: center;
    .jqdh-input {
      width: 63px;
      border: none;
      height: 96%;
      padding: 0 0 0 15px;
      color: #333333;
      font-size: 12px;
    }
    .sperate {
      width: 10px;
      height: 2px;
      background: #000000;
      margin: 0 6px;
    }
    .version-input {
      width: 140px;
      border: none;
      height: 96%;
      padding: 0 15px;
      color: #333333;
    }
  }
}
</style>
