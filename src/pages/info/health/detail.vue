<template>
  <div class="hb-health-detail">
    <wx-header v-show="!isPlatform" show-back>
      <span slot="headerTitle">查看详情</span>
      <span slot="headerOther" class="second-font">
        (体检单编号&nbsp;{{ healthId }})
        <div v-if="pageListCondition" class="prev-next-group">
          <el-button size="small" class="prev-next-btn" type="text" @click="handleSubHealth('pre')">上一单</el-button>
          <el-button size="small" class="prev-next-btn" type="text" @click="handleSubHealth('next')">下一单</el-button>
        </div>
      </span>
    </wx-header>
    <div :class="{isPlatformMainContainer: isPlatform, isPlatformForBorder: isPlatform}" class="hb-main-container">
      <div :class="{isPlatformMainContainer: isPlatform, isPlatformMainContainerWidth: isPlatform}" class="hb-main-content health-container">
        <el-row :gutter="20" :class="{checkDetailTop: checkDetailFlag && isPlatform, isPlatformMainContainerWidth: isPlatform}" class="row-container-top">
          <el-col :span="colNumLeft" :class="{isPlatformPart: isPlatform}" class="col-container">
            <div class="bg-part">
              <div class="common-title">
                <i class="descri" />
                <span class="title-font">体检用户信息</span>
              </div>
              <div v-if="!isPlatform" class="user-info">
                <div class="left">
                  <p>
                    <label>用户姓名：</label>
                    <span :title="healthData.driverName">{{ healthData.driverName }}</span>
                  </p>
                  <p>
                    <label>身份证号：</label>
                    <span :title="healthData.driverIdentity">{{ healthData.driverIdentity }}</span>
                  </p>
                  <p>
                    <label>联系方式：</label>
                    <span :title="healthData.driverPhone">{{ healthData.driverPhone }}</span>
                  </p>
                  <p>
                    <label>体检时间：</label>
                    <span :title="healthData.createTime">{{ healthData.createTime }}</span>
                  </p>
                  <p>
                    <label>设备地点：</label>
                    <span :title="healthData.devicePlace">{{ healthData.devicePlace }}</span>
                  </p>
                  <p>
                    <label>体检设备：</label>
                    <span :title="healthData.deviceCode">{{ healthData.deviceCode }}</span>
                  </p>
                </div>
                <div class="left">
                  <p>
                    <label>业务类型：</label>
                    <span :title="BusinessType[healthData.bizType]">{{ BusinessType[healthData.bizType] }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'A'">
                    <label>申领车型：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'F' || healthData.bizType == 'G' || healthData.bizType == 'L'">
                    <label>准驾车型：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'H' || healthData.bizType =='R' || healthData.bizType =='T' || healthData.bizType =='U'">
                    <label>降级后准驾：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'B'">
                    <label>现有准驾：</label>
                    <span :title="healthData.originalDrivingType">{{ healthData.originalDrivingType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'B'">
                    <label>增驾车型：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'A' || healthData.bizType == 'B'">
                    <label>报考驾校：</label>
                    <span :title="healthData.driverSchoolName">{{ healthData.driverSchoolName }}</span>
                  </p>
                </div>
                <div class="right">
                  <div class="pic-one">
                    <div class="camera-area">
                      <img v-if="!healthData.identityImage" :src="errorImg" :onerror="onerrorImg" class="camera" alt="身份证照片">
                      <img v-else :src="healthData.identityImage" :onerror="onerrorImg" class="camera" alt="身份证照片">
                    </div>
                    <span class="pic-text">身份证照片</span>
                  </div>
                  <div class="pic-one">
                    <el-popover trigger="hover" placement="bottom" popper-class="big-popover xc-popover">
                      <div class="pop-area">
                        <img v-if="!healthData.currentImage" :src="errorImg" :onerror="onerrorImg" class="popImg" alt="现场拍摄照片">
                        <img v-else :src="healthData.currentImage" :onerror="onerrorImg" class="popImg" alt="现场拍摄照片">
                      </div>
                      <div slot="reference" class="camera-area">
                        <img v-if="!healthData.currentImage" :src="errorImg" :onerror="onerrorImg" class="camera" alt="现场拍摄照片">
                        <img v-else :src="healthData.currentImage" :onerror="onerrorImg" class="camera" alt="现场拍摄照片">
                      </div>
                    </el-popover>
                    <span class="pic-text">现场拍摄照片</span>
                  </div>
                  <div class="pic-one last-one">
                    <el-popover trigger="hover" placement="bottom" popper-class="big-popover">
                      <div class="pop-area">
                        <img v-if="!healthData.contrastImage" :src="errorImg" :onerror="onerrorImg" class="popImg" alt="人证对比照片">
                        <img v-else :src="healthData.contrastImage" :onerror="onerrorImg" class="popImg" alt="人证对比照片">
                      </div>
                      <div slot="reference" class="camera-area camera-top">
                        <img v-if="!healthData.contrastImage" :src="errorImg" :onerror="onerrorImg" class="camera" alt="人证对比照片">
                        <img v-else :src="healthData.contrastImage" :onerror="onerrorImg" class="camera" alt="人证对比照片">
                      </div>
                    </el-popover>
                    <div class="camera-area camera-bottom">
                      <img v-if="!healthData.driverSign" :src="errorImg" :onerror="onerrorImg" class="camera" alt="人证对比照片">
                      <img v-else :src="healthData.driverSign" :onerror="onerrorImg" class="camera" alt="人证对比照片">
                    </div>
                    <span class="pic-text">人证对比照片</span>
                  </div>
                </div>
              </div>
              <div v-else class="user-info">
                <div :class="{checkDetailLeft: checkDetailFlag}" class="left">
                  <p v-if="checkDetailFlag">
                    <label>用户姓名：</label>
                    <span :title="healthData.driverName">{{ healthData.driverName }}</span>
                  </p>
                  <p v-if="checkDetailFlag">
                    <label>身份证号：</label>
                    <span :title="healthData.driverIdentity">{{ healthData.driverIdentity }}</span>
                  </p>
                  <p>
                    <label>联系方式：</label>
                    <span :title="healthData.driverPhone">{{ healthData.driverPhone }}</span>
                  </p>
                  <p>
                    <label>体检时间：</label>
                    <span :title="healthData.createTime">{{ healthData.createTime }}</span>
                  </p>
                  <p v-if="checkDetailFlag">
                    <label>设备地点：</label>
                    <span :title="healthData.devicePlace">{{ healthData.devicePlace }}</span>
                  </p>
                  <p v-if="checkDetailFlag">
                    <label>体检设备：</label>
                    <span :title="healthData.deviceCode">{{ healthData.deviceCode }}</span>
                  </p>
                  <p>
                    <label>业务类型：</label>
                    <span :title="BusinessType[healthData.bizType]">{{ BusinessType[healthData.bizType] }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'A'">
                    <label>申领车型：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'F' || healthData.bizType == 'G' || healthData.bizType == 'L'">
                    <label>准驾车型：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'H' || healthData.bizType =='R' || healthData.bizType =='T' || healthData.bizType =='U'">
                    <label>降级后准驾：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'B'">
                    <label>现有准驾：</label>
                    <span :title="healthData.originalDrivingType">{{ healthData.originalDrivingType }}</span>
                  </p>
                  <p v-if="healthData.bizType == 'B'">
                    <label>增驾车型：</label>
                    <span :title="healthData.drivingLicenseType">{{ healthData.drivingLicenseType }}</span>
                  </p>
                  <p v-if="checkDetailFlag && (healthData.bizType == 'A' || healthData.bizType == 'B')">
                    <label>报考驾校：</label>
                    <span :title="healthData.driverSchoolName">{{ healthData.driverSchoolName }}</span>
                  </p>
                </div>
                <div :class="{isCheckDetailRight: checkDetailFlag,isMangShenRight: !checkDetailFlag}" class="right">
                  <div class="pic-one" style="height: 117px">
                    <div class="camera-area">
                      <img v-if="!healthData.identityImage" :src="errorImg" :onerror="onerrorImg" class="camera" alt="身份证照片">
                      <img v-else :src="healthData.identityImage" :onerror="onerrorImg" class="camera" alt="身份证照片">
                    </div>
                    <span class="pic-text">身份证照片</span>
                  </div>
                  <div class="pic-one" style="width: 190px;height: 117px">
                    <el-popover trigger="hover" placement="bottom" popper-class="big-popover">
                      <div class="pop-area">
                        <img v-if="!healthData.contrastImage" :src="errorImg" :onerror="onerrorImg" class="popImg" alt="人证对比照片">
                        <img v-else :src="healthData.contrastImage" :onerror="onerrorImg" class="popImg" alt="人证对比照片">
                      </div>
                      <div slot="reference" class="camera-area camera-top" style="height: 100%">
                        <img v-if="!healthData.contrastImage" :src="errorImg" :onerror="onerrorImg" style="width: 100%" class="camera" alt="人证对比照片">
                        <img v-else :src="healthData.contrastImage" :onerror="onerrorImg" style="width: 100%" class="camera" alt="人证对比照片">
                      </div>
                    </el-popover>
                    <span class="pic-text">人证对比照片</span>
                  </div>
                  <div :class="{isCheckDetailMarginTop: checkDetailFlag,isMangShenSetHeightAndWidth: !checkDetailFlag}" style="height: 137px" class="pic-one">
                    <el-popover trigger="hover" placement="bottom" popper-class="big-popover xc-popover">
                      <div class="pop-area">
                        <img v-if="!healthData.currentImage" :src="errorImg" :onerror="onerrorImg" class="popImg" alt="现场拍摄照片">
                        <img v-else :src="healthData.currentImage" :onerror="onerrorImg" class="popImg" alt="现场拍摄照片">
                      </div>
                      <div slot="reference" class="camera-area">
                        <img v-if="!healthData.currentImage" :src="errorImg" :onerror="onerrorImg" class="camera" alt="现场拍摄照片">
                        <img v-else :src="healthData.currentImage" :onerror="onerrorImg" class="camera" alt="现场拍摄照片">
                      </div>
                    </el-popover>
                    <span class="pic-text">现场拍摄照片</span>
                  </div>
                  <div v-if="checkDetailFlag" class="pic-one last-one" style="margin-top: 40px;width: 190px;border: 1px solid #ccc;height: 135px">
                    <div style="border: none;margin-top: 22%" class="camera-area camera-bottom">
                      <img v-if="!healthData.driverSign" :src="errorImg" :onerror="onerrorImg" class="camera" alt="签名照片">
                      <img v-else :src="healthData.driverSign" :onerror="onerrorImg" class="camera" alt="签名照片">
                    </div>
                    <span class="pic-text">签名照片</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="colNumRight" class="col-container">
            <div class="bg-part" style="padding-right: 10px">
              <div class="common-title">
                <i class="descri" />
                <span class="title-font">审核信息</span>
                <span v-if="drivingLicenseType" class="license-type-out">
                  <span class="license-type-inner">{{ drivingLicenseType }}证用户</span>
                </span>
              </div>
              <div v-if="healthData.checkStatus == 0 && healthData.paymentDone == false" class="uncheck-info no-pay-parent">
                <div class="no-pay">
                  <!-- <span class="danger" style="color:#fd7714;font-weight:normal;line-height:24px;">
                    <i class="el-icon-warning" style="margin-right:6px;"></i>
                    <i style="display:inline-block;font-style:normal;margin-bottom:6px;">暂无法审核</i>
                  </span>-->
                  <el-button type="text" style="padding:0;position:relative;margin-left:24px;">
                    <i class="el-icon-warning" style="margin-right:6px;position:absolute; left:-29px;top:-6px;" />暂无法审核
                  </el-button>
                  <span class="ordinary">体检通过未支付</span>
                  <span class="ordinary">待支付完成后才可审核</span>
                </div>
              </div>
              <div v-else-if="healthData.checkStatus == 0" class="uncheck-info">
                <!-- 待审核 -->
                <div class="left" style="margin-left: 22%">
                  <el-button class="passBtn" type="success" size="big" style="width:128px" plain @click="handleHealthDetail">通过</el-button>
                  <el-button class="rejectBtn" type="danger" size="big" style="width:128px" plain @click="handleHealthDetail('reject')">驳回</el-button>
                </div>
                <!-- <div class="right">
                  <i class="el-icon-warning"></i>
                  <span class="danger">驳回后无法撤销</span>
                  <span class="ordinary">请仔细审核体检信息后确认是否需要驳回</span>
                </div>-->
              </div>
              <div v-else class="check-info">
                <!-- 已审核 -->
                <div v-if="healthData.qualifiedStatus == 1" :class="{isPlatformInfoParent: !checkDetailFlag}" class="info-parent">
                  <!-- 合格体检单人工审核（通过，驳回） -->
                  <p>
                    <label>审核结果：</label>
                    <span v-if="healthData.checkStatus == 1" style="color: #67c23a">通过</span>
                    <span v-if="healthData.checkStatus == -1" style="color: #ef4646">驳回</span>
                  </p>
                  <p>
                    <label>审核人：</label>
                    {{ healthData.checkBy }}
                  </p>
                  <p>
                    <label>审核时间：</label>
                    {{ healthData.checkTime }}
                  </p>
                  <p v-if="healthData.checkStatus == -1 && healthData.checkReason">
                    <label>驳回理由：</label>
                    {{ healthData.checkReason }}
                  </p>
                  <img v-if="healthData.checkStatus == 1" :class="{isPlatformInfoImg: isPlatform}" class="info-img" src="./pass.png">
                  <img v-if="healthData.checkStatus == -1" :class="{isPlatformInfoImg: isPlatform}" class="info-img" src="./reject.png">
                </div>
                <div v-else-if="healthData.qualifiedStatus == 0 || healthData.qualifiedStatus == 2" class="info-parent">
                  <!-- 不合格，中途退出自动驳回 -->
                  <p>
                    <label>审核结果：</label>
                    <span style="color: #ef4646">自动驳回</span>
                  </p>
                  <p v-if="healthData.checkTime">
                    <label>审核时间：</label>
                    {{ healthData.checkTime }}
                  </p>
                  <img :class="{isPlatformInfoImg: isPlatform}" class="info-img" src="./auto-reject.png">
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30" :class="{isPlatformPartTopBorder: isPlatform,isPlatformMainContainerWidth: isPlatform}" class="row-container-bottom">
          <el-col :span="12" class="col-container">
            <div class="bg-part">
              <div class="common-title">
                <div class="title-wrap">
                  <div>
                    <i class="descri" />
                    <span class="title-font">体检视频</span>
                  </div>
                  <div :class="{isPlatformResultBtn: isPlatform}" class="result-btn">
                    <el-button :disabled="!healthData.healthReportDetailVO" :class="{'active': (activeDirection + activeType) == 'front-1'}" size="mini" plain @click="handleClickVideoBtn(-1, 'front')">正面</el-button>
                    <el-button :disabled="!healthData.healthReportDetailVO" :class="{'active': (activeDirection + activeType) == 'back-1'}" size="mini" plain @click="handleClickVideoBtn(-1, 'back')">全景</el-button>
                  </div>
                </div>
              </div>
              <div class="video-info">
                <video-player v-if="playerOptions.sources[0].src" ref="videoPlayer" :playsinline="true" :options="playerOptions" class="vjs-custom-skin vjs-big-play-centered video-player-container" @ready="playerIsReady" />
                <span v-else>视频播放失败</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12" class="col-container" style="padding-right:0">
            <div class="bg-part">
              <div class="common-title" style="margin-bottom: 9px">
                <div class="update-wrap">
                  <div>
                    <i class="descri" />
                    <span class="title-font">体检结果</span>
                  </div>
                  <div :class="{isPlatformResultBtn: isPlatform}" class="result-btn">
                    <el-button v-if="!openUpdate && healthData.qualifiedStatus == 1 && btnPermissions.indexOf('1000211') != -1" size="mini" style="background-color: #fd7715;color: #ffffff;" @click="clickOpenUpdate">修改</el-button>
                    <el-button v-if="openUpdate" size="mini" style="border: solid 1px #cccccc;background-color:#ffffff;color:#333333" @click="cancleUpdate">取消</el-button>
                    <el-button v-if="openUpdate" size="mini" style="background-color: #fd7715;color: #ffffff;" @click="submitUpdate">提交</el-button>
                  </div>
                </div>
              </div>
              <div class="result-info">
                <div class="result-item">
                  <div class="result-content">
                    <div class="part-title">视力与辨色力检测</div>
                    <div v-if="videoDots.length == 0 || !healthData.healthReportDetailVO" :class="{isPlatformPartContent: isPlatform}" class="part-content">
                      <p class="ellipsis">未检测</p>
                    </div>
                    <div v-else :class="{isPlatformPartContent: isPlatform}" class="part-content">
                      <p class="ellipsis">
                        <span>视力矫正:</span>
                        <span v-if="!openUpdate" style="color: #333333;">{{ healthData.healthReportDetailVO.eyeCorrect ? '配戴眼镜' : '裸眼' }}</span>
                        <el-select v-if="openUpdate" v-model="eyeCorrect" placeholder="请选择" size="mini" style="width:109px;margin-left:10px">
                          <el-option v-for="item in eyeOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                      </p>
                      <p :class="{isPlatformEllipsis: isPlatform}" class="ellipsis">左眼：{{ healthData.healthReportDetailVO.eyeLeft || '未知' }}，右眼：{{ healthData.healthReportDetailVO.eyeRight || '未知' }}，红绿色盲：{{ healthData.healthReportDetailVO.eyeColorVision == null ? '未知' : healthData.healthReportDetailVO.eyeColorVision ? '无' : '有' }}</p>
                    </div>
                  </div>
                </div>
                <el-divider />
                <div class="result-item">
                  <div class="result-content">
                    <div class="part-title">听力检测</div>
                    <div v-if="videoDots.length < 4 || !healthData.healthReportDetailVO" :class="{isPlatformPartContent: isPlatform}" class="part-content">
                      <p class="ellipsis">未检测</p>
                    </div>
                    <div v-else :class="{isPlatformPartContent: isPlatform}" class="part-content">
                      <p class="ellipsis">
                        <span>听力矫正:</span>
                        <span v-if="!openUpdate" style="color: #333333;">{{ healthData.healthReportDetailVO.earHearingaid ? '佩戴助听器' : '裸耳' }}</span>
                        <el-select v-if="openUpdate" v-model="earHearingaid" placeholder="请选择" size="mini" style="width:109px;margin-left:10px">
                          <el-option v-for="item in earOptions" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                      </p>
                      <p :class="{isPlatformEllipsis: isPlatform}" class="ellipsis">左耳：{{ healthData.healthReportDetailVO.earLeft ? '合格' : '不合格' }}，右耳：{{ healthData.healthReportDetailVO.earRight ? '合格' : '不合格' }}</p>
                    </div>
                  </div>
                </div>
                <el-divider />
                <div class="result-item">
                  <div class="result-content">
                    <div class="part-title">躯干与四肢检测</div>
                    <div v-if="videoDots.length < 5 || !healthData.healthReportDetailVO" :class="{isPlatformPartContent: isPlatform}" class="part-content">
                      <p class="ellipsis">未检测</p>
                    </div>
                    <div v-else :class="{isPlatformPartContent: isPlatform}" class="part-content">
                      <p class="ellipsis">
                        <span>
                          身高：
                          <span v-if="!openUpdate">{{ healthData.healthReportDetailVO.height ? healthData.healthReportDetailVO.height + '厘米' : '未知' }}</span>
                          <span v-if="openUpdate">
                            <el-input v-model="height" placeholder size="mini" style="width:73px;margin-left:10px" />CM
                          </span>
                        </span>
                      </p>
                      <p :class="{isPlatformEllipsis: isPlatform}" class="ellipsis">四肢：{{ hasLimbs }}，{{ hasDyskinesia }}</p>
                    </div>
                  </div>
                </div>
                <el-divider />
                <div class="result-item">
                  <!-- <div class="img-cover">
                    <img :src="playerOptions.poster || errorImg" alt="体检全程视频" :onerror="onerrorImg" />
                  </div>-->
                  <div class="result-content">
                    <div class="part-title">体检全程视频</div>
                    <div :class="{isPlatformPartContent: isPlatform}" class="part-content">
                      <p class="ellipsis">体检{{ healthData.qualifiedStatus == 1 ? '合格' : '不合格' }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <img v-if="healthData.qualifiedStatus == 0" :class="{isPlatformMarginTop: isPlatform}" class="result-pic" src="./no-qualified.png">
              <img v-else-if="healthData.qualifiedStatus == 1" :class="{isPlatformMarginTop: isPlatform}" class="result-pic" src="./has-qualified.png">
              <img v-else-if="healthData.qualifiedStatus == 2" :class="{isPlatformMarginTop: isPlatform}" class="result-pic" src="./half-leave.png">
            </div>
          </el-col>
        </el-row>
        <el-row class="row-container-last">
          <el-col :span="24" class="col-container">
            <div :class="{isPlatformPartTopBorder: isPlatform}" class="bg-part">
              <div class="common-title">
                <i class="descri" />
                <span class="title-font">视频截图</span>
              </div>
              <div class="key-image-info">
                <div v-if="!keyImages || keyImages.length == 0" class="no-result">未查询到结果</div>
                <div v-else class="has-result">
                  <div v-for="(item, index) in keyImages" :key="index" class="key-image-one">
                    <el-image :src="item.pic" class="key-el-image" @click="openViewer(index)">
                      <div slot="error" class="image-slot">
                        <img :src="errorImg">
                      </div>
                    </el-image>

                    <span class="title">
                      <img v-if="item.success == 1" src="./videosuccess.png" alt>
                      <img v-else src="./videofalse.png" alt>
                      {{ item.title }}
                    </span>
                  </div>
                  <span v-if="showViewer" class="preview-title">{{ keyImagesTitle }}</span>
                  <el-image-viewer v-if="showViewer" :z-index="2000" :on-close="closeViewer" :on-switch="switchViewer" :url-list="keyImagesUrl" />
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="20%">
        <span>您还未完成签章设置，请先设置好签章，才能进行体检单审核</span>
        <span slot="footer" style="text-align: center" class="dialog-footer">
          <el-button type="primary" @click="closeDialog">设置</el-button>
          <el-button @click="closeDialog('cancel')">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog :before-close="handleClose" :visible.sync="dialogVisible1" width="23%">
        <span>该体检单已被其他医生审核，是否继续审核其他体检单？</span>
        <span slot="footer" style="text-align: center" class="dialog-footer">
          <el-button type="primary" @click="closeDialogNext">下一单（{{ tenCount }}秒）</el-button>
          <el-button @click="closeDialogNext('cancel')">查看此订单</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import wxHeader from '@/components/header/index'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import {
  healthPageList,
  getHealthById,
  healthCheck,
  getHistoryVideo,
  getNextHealth,
  getCurrentCheckState,
  updateHealthInfo
} from '@/api/health.js'
import errorImg from './errorImg.png'
import errorVideo from './errorVideo.png'
// 视频相关
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import '../../../../static/plugin/videojs-markers/videojs.markers.css'
import videojs from 'video.js'
import { videoPlayer } from 'vue-video-player'
import '../../../../static/plugin/videojs-markers/videojs-markers.js'
window.videojs = videojs
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

export default {
  components: {
    wxHeader,
    videoPlayer,
    ElImageViewer
  },
  props: {
    isPlatform: {
      type: Boolean,
      default: false
    },
    detailId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      height: '',
      earHearingaid: '',
      eyeCorrect: '',
      lastIndex: 0,
      eyeOptions: [
        {
          label: '裸眼',
          value: 0
        },
        {
          label: '佩戴眼镜',
          value: 1
        }
      ],
      earOptions: [
        {
          label: '裸耳',
          value: 0
        },
        {
          label: '佩戴助听器',
          value: 1
        }
      ],
      // drivingLicenseType: this.splitType(this.healthData.drivingLicenseType || ''),
      // originalDrivingType: this.splitType(this.healthData.originalDrivingType || ''),
      dialogVisible: false,
      dialogVisible1: false,
      closeDialogFlag: false,
      openUpdate: false,
      tenCount: '4',
      timer: null,
      errorImg: errorImg,
      errorVideo: errorVideo,
      onerrorImg: 'this.src="' + errorImg + '"',
      onerrorVideo: 'this.src="' + errorVideo + '"',
      pageListCondition: JSON.parse(localStorage.getItem('healthCondition')),
      healthId: '',
      healthData: {},
      videoDirectId: '', // 正面视频ID
      videoObvId: '', // 全景视频ID
      videoDots: [], // 视频打点
      videoFrontDots: [], // 正面打点集合
      videoBackDots: [], // 全景打点集合
      keyImages: [], // 视频截图（关键帧）
      keyImagesUrl: [], // 关键帧图片列表
      keyImagesCopyUrl: [], // 关键帧图片copy,防止乱序
      keyImagesTitle: '', // 关键帧title
      showViewer: false,
      showIndex: -1,
      drivingLicenseType: '',
      /** 播放器参数 start */
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 导致视频一结束就重新开始
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: '' // 视频url地址
          }
        ],
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
          volumePanel: {
            inline: false
          }
        }
      },
      activeType: -1,
      activeDirection: 'front',
      BusinessType: {
        A: '申领驾照(新学员)体检',
        B: '增驾体检',
        W: '变更考试地',
        C: '持军警驾驶证申领',
        D: '持境外驾驶证申领',
        E: '证件损毁换证',
        F: '转入换证',
        G: '有效期满换证',
        H: '达到规定年龄降级换证',
        I: '自愿降低准驾车型换证',
        R: '因身体条件变化降级换证',
        J: '信息变化换证',
        S: '信息备案',
        K: '补证',
        L: '年审体检',
        N: '注销',
        T: '注销最高准驾车型',
        U: '注销实习准驾车型',
        O: '恢复驾驶资格',
        P: '延期换证',
        V: '延期审验',
        Q: '延期提交身体条件证明',
        Y: '降级换证体检', // 自定义的中间值 对应selectBusiness 的 降级换证体检
        Z: '换证体检'
      }
    }
  },
  watch: {
    detailId: {
      handler: function (val) {
        this.healthId = val
        this.loadHealthDetail()
        this.openUpdate = false
      },
      deep: true
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(['btnPermissions']),
    ...mapState({
      user: (state) => state.user
    }),
    colNumLeft() {
      return this.isPlatform ? 18 : 16
    },
    colNumRight() {
      return this.isPlatform ? 6 : 8
    },
    checkDetailFlag() {
      return this.btnPermissions.indexOf('1000208') != -1
    },
    player() {
      return this.$refs.videoPlayer.player // 自定义播放
    },
    hasLimbs() {
      let result = ''
      if (
        this.healthData.healthReportDetailVO.limbsLeftLower &&
        this.healthData.healthReportDetailVO.limbsRightLower &&
        this.healthData.healthReportDetailVO.limbsLeftUpper &&
        this.healthData.healthReportDetailVO.limbsRightUpper
      ) {
        result = '无残疾'
      } else if (
        !this.healthData.healthReportDetailVO.limbsLeftLower &&
        !this.healthData.healthReportDetailVO.limbsLeftUpper
      ) {
        result = '上下肢残疾'
      } else if (!this.healthData.healthReportDetailVO.limbsLeftLower) {
        result = '下肢残疾'
      } else if (!this.healthData.healthReportDetailVO.limbsLeftUpper) {
        result = '上肢残疾'
      }
      return result
    },
    hasDyskinesia() {
      let result = ''
      if (
        this.healthData.healthReportDetailVO.dyskinesia &&
        this.healthData.healthReportDetailVO.limbsDyskinesia
      ) {
        result = '无运动功能障碍'
      } else if (
        !this.healthData.healthReportDetailVO.dyskinesia &&
        !this.healthData.healthReportDetailVO.limbsDyskinesia
      ) {
        result = '上下肢运动功能障碍'
      } else if (!this.healthData.healthReportDetailVO.dyskinesia) {
        result = '上肢运动功能障碍'
      } else if (!this.healthData.healthReportDetailVO.limbsDyskinesia) {
        result = '下肢运动功能障碍'
      }
      return result
    }
  },
  created() {
    this.healthId = this.$route.query.healthId || ''
    if (!this.healthId) {
      if (!this.isPlatform) {
        this.$message.error('体检单不存在')
      }
    } else {
      this.loadHealthDetail()
    }
  },
  methods: {
    clickOpenUpdate() {
      this.openUpdate = true
      this.height = this.healthData.healthReportDetailVO.height
      this.earHearingaid = this.healthData.healthReportDetailVO.earHearingaid
      this.eyeCorrect = this.healthData.healthReportDetailVO.eyeCorrect
    },
    cancleUpdate() {
      this.openUpdate = false
      this.height = this.healthData.healthReportDetailVO.height
      this.earHearingaid = this.healthData.healthReportDetailVO.earHearingaid
      this.eyeCorrect = this.healthData.healthReportDetailVO.eyeCorrect
    },
    submitUpdate() {
      if (!this.healthData.originalDrivingType) {
        this.healthData.originalDrivingType = ''
      }
      if (!this.healthData.drivingLicenseType) {
        this.healthData.drivingLicenseType = ''
      }
      const licenseType =
        this.healthData.drivingLicenseType + this.healthData.originalDrivingType
      const licenseTypeArray = this.splitType(licenseType).split(',')
      const bigCar = ['A3', 'N', 'B2', 'A2', 'A1']
      console.log(licenseTypeArray)
      if (this.earHearingaid == 1) {
        for (let i = 0; i < licenseTypeArray.length; i++) {
          console.log(licenseTypeArray[i])
          if (licenseTypeArray[i] != 'C1' && licenseTypeArray[i] != 'C2') {
            this.$message.error('申领车型或原驾车型不允许佩戴助听器')
            return
          }
        }
      }
      if (this.height < 150) {
        this.$message.error('身高需高于150CM')
        return
      }
      if (this.height > 200) {
        this.$message.error('身高不允许超过200CM')
        return
      }
      if (this.height < 155) {
        for (let i = 0; i < licenseTypeArray.length; i++) {
          if (bigCar.indexOf(licenseTypeArray[i]) != -1) {
            this.$message.error('申领车型或原驾车型身高需高于155CM')
            return
          }
        }
      }
      const formData = {
        reportId: this.healthId,
        earHearingaid: this.earHearingaid,
        eyeCorrect: this.eyeCorrect,
        height: this.height
      }
      updateHealthInfo(formData).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: '修改信息成功',
            type: 'success'
          })
          this.loadHealthDetail()
        }
      })
      this.openUpdate = false
    },
    splitType(str = '') {
      let result = ''
      const len = str.length
      if (len == 0 || !str) {
        result = ''
      } else if (len <= 2 && ['A', 'B', 'C'].indexOf(str.charAt(0)) != -1) {
        result = str
      } else {
        const arr = []
        for (let i = 0; i < len; ) {
          const code = str.charAt(i)
          if (['A', 'B', 'C'].indexOf(code) == -1) {
            arr.push(code)
            i++
          } else {
            arr.push(code + str.charAt(i + 1))
            i += 2
          }
        }
        result = arr.join(',')
      }
      return result
    },
    computeIdentity(str) {
      if (str) {
        return str.substr(0, 10) + '****' + str.substr(-4)
      } else {
        return '--'
      }
    },
    computeName(str) {
      if (str) {
        let result = ''
        for (let i = 0; i < str.length; i++) {
          if (i == 0) {
            result = str.substr(0, i + 1)
          } else {
            result += '*'
          }
        }
        return result
      } else {
        return '--'
      }
    },
    loadHealthDetail(bool) {
      this.healthData.driverSign = errorImg
      this.healthData.currentImage = errorImg
      this.healthData.contrastImage = errorImg
      this.healthData.identityImage = errorImg
      this.keyImages = []
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.content-container')
      })
      const _this = this
      getHealthById(
        {
          reportId: this.healthId
        },
        this.isPlatform
      )
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this.healthId = res.data.id
            this.healthData = res.data
            this.height = res.data.healthReportDetailVO.height
            this.earHearingaid = res.data.healthReportDetailVO.earHearingaid
            this.eyeCorrect = res.data.healthReportDetailVO.eyeCorrect
            this.videoDirectId = res.data.videoDirectId || ''
            this.videoObvId = res.data.videoObvId || ''
            this.videoDots = res.data.healthReportVideoInfoList || []

            // 驾照格式转化 A1B2CE ====> A1、B2、C、E
            if (!res.data.drivingLicenseType) {
              this.drivingLicenseType = ''
            } else {
              const regex = /\w\d?/g
              this.drivingLicenseType = res.data.drivingLicenseType
                .match(regex)
                .join('、')
            }

            this.keyImages = []
            this.keyImagesUrl = []
            this.keyImagesCopyUrl = []
            if (
              res.data.healthReportKeyList &&
              res.data.healthReportKeyList.length != 0
            ) {
              res.data.healthReportKeyList.forEach((item) => {
                _this.keyImages.push({
                  title: item.title,
                  pic: item.direct == 1 ? item.frontPic : item.backPic,
                  success: item.success
                })
                _this.keyImagesUrl.push(
                  item.direct == 1 ? item.frontPic : item.backPic
                )
              })
              _this.keyImagesCopyUrl = [..._this.keyImagesUrl]
            }
            this.videoFrontDots = []
            this.videoBackDots = []
            this.videoDots.forEach((item) => {
              _this.videoFrontDots.push({
                time: item.time / 1000,
                text: item.title,
                pic: item.frontPic
              })
              _this.videoBackDots.push({
                time: item.time / 1000,
                text: item.title,
                pic: item.backPic
              })
            })
            if (!bool) {
              this.getVideoUrl()
            }
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleSubHealth(upDown) {
      const _this = this
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.content-container')
      })
      const formData = Object.assign(
        {},
        {
          index: upDown
        },
        this.pageListCondition
      )
      getNextHealth(formData)
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this.healthId = res.data.id
            this.healthData = res.data
            this.videoDirectId = res.data.videoDirectId
            this.videoObvId = res.data.videoObvId
            this.videoDots = res.data.healthReportVideoInfoList || []

            // 驾照格式转化 A1B2CE ====> A1、B2、C、E
            if (!res.data.drivingLicenseType) {
              this.drivingLicenseType = ''
            } else {
              const regex = /\w\d?/g
              this.drivingLicenseType = res.data.drivingLicenseType
                .match(regex)
                .join('、')
            }

            this.keyImages = []
            this.keyImagesUrl = []
            this.keyImagesCopyUrl = []
            if (
              res.data.healthReportKeyList &&
              res.data.healthReportKeyList.length != 0
            ) {
              res.data.healthReportKeyList.forEach((item) => {
                _this.keyImages.push({
                  title: item.title,
                  pic: item.direct == 1 ? item.frontPic : item.backPic,
                  success: item.success
                })
                _this.keyImagesUrl.push(
                  item.direct == 1 ? item.frontPic : item.backPic
                )
              })
              _this.keyImagesCopyUrl = [..._this.keyImagesUrl]
            }
            if (this.pageListCondition.orderBy == 'ID') {
              this.pageListCondition.indexValue = res.data.id
            } else if (this.pageListCondition.orderBy == 'CREATE_TIME') {
              // 创建时间可能重复 还是按照id排序
              this.pageListCondition.indexValue = res.data.id
            }
            this.videoFrontDots = []
            this.videoBackDots = []
            this.videoDots.forEach((item) => {
              _this.videoFrontDots.push({
                time: item.time / 1000,
                text: item.title,
                pic: item.frontPic
              })
              _this.videoBackDots.push({
                time: item.time / 1000,
                text: item.title,
                pic: item.backPic
              })
            })
            this.getVideoUrl()
          } else if (res.code == -1) {
            this.$message.closeAll()
            this.$message({
              showClose: true,
              duration: 2000,
              message:
                upDown == 'pre'
                  ? '当前已是第一个体检单'
                  : '当前已是最后一个体检单',
              type: 'warning'
            })
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    getVideoUrl(value) {
      getHistoryVideo({
        videoId:
          this.activeDirection == 'front' ? this.videoDirectId : this.videoObvId
      })
        .then((res) => {
          if (res.code == 0) {
            this.playerOptions.sources[0].src = res.data.playInfoList[0].playURL
            if (value != -1) {
              this.playerOptions.poster = res.data.videoBase.coverURL
            }
          } else {
            this.playerOptions.sources[0].src = ''
            this.playerOptions.poster = ''
          }
        })
        .catch(() => {
          this.playerOptions.sources[0].src = ''
          this.playerOptions.poster = ''
        })
    },
    closeDialog(type) {
      // if (this.timer) {
      //   clearInterval(this.timer)
      //   this.timer = null
      this.dialogVisible = false
      // this.closeDialogFlag = true
      // }
      if (type != 'cancel') {
        this.$router.push({
          name: 'personalEdit',
          query: {
            userId: this.user.id,
            isPersonalCenter: true
          }
        })
      }
    },
    closeDialogNext(type) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.dialogVisible1 = false
        this.closeDialogFlag = true
      }
      if (type == 'cancel') {
        this.loadHealthDetail()
      } else {
        this.$emit('reloadList')
      }
    },
    handleClose() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.dialogVisible1 = false
        this.closeDialogFlag = true
      }
      // this.$emit('reloadList')
    },
    getCode() {
      this.closeDialogFlag = false
      const TIME_COUNT = 10
      if (!this.timer) {
        this.tenCount = TIME_COUNT
        // this.show = false
        this.timer = setInterval(() => {
          if (this.tenCount > 0 && this.tenCount <= TIME_COUNT) {
            this.tenCount--
          } else {
            // this.show = true
            clearInterval(this.timer)
            this.timer = null
            this.dialogVisible1 = false
            if (!this.closeDialogFlag) {
              console.log('daojishi')
              this.$emit('reloadList')
            }
          }
        }, 1000)
      }
    },
    checkReport(obj) {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.view-container')
      })
      healthCheck(obj, this.isPlatform)
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            if (this.isPlatform) {
              this.$emit('reloadList')
            } else {
              this.$message.success('审核成功')
              this.loadHealthDetail(true)
            }
          } else if (
            res.code == -1 &&
            res.msg == '未设置签章，请编辑' &&
            this.isPlatform
          ) {
            // this.getCode()
            this.dialogVisible = true
            // const _this = this
            // this.$confirm('您还未完成签章设置，请先设置好签章，才能进行体检单审核', '', {
            //   distinguishCancelAndClose: true,
            //   confirmButtonText: '取消',
            //   cancelButtonText: '设置(' + this.tenCount + '秒)',
            //   customClass: 'redConfirm',
            //   confirmButtonClass: 'rightBtn',
            //   cancelButtonClass: 'leftBtn'
            // }).then((action) => {
            //   console.log('取消操作')
            // }).catch(async (action) => {
            //   if (action === 'cancel') {
            //     //  personalEdit?userId=460533531089702912&isPersonalCenter=true
            //     _this.$router.push({
            //       name: 'personalEdit',
            //       query: {
            //         userId: _this.user.id,
            //         isPersonalCenter: true
            //       }
            //     })
            //   }
            // })
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleHealthDetail(type) {
      if (!this.isPlatform) {
        if (type == 'reject') {
          this.rejectReport()
        } else {
          this.passReport()
        }
      } else {
        const data = {
          reportId: this.healthId
        }
        getCurrentCheckState(data).then((res) => {
          if (res.data) {
            // this.healthId = id
            if (type == 'reject') {
              this.rejectReport()
            } else {
              this.passReport()
            }
          } else {
            this.getCode(this.healthId)
            this.dialogVisible1 = true
          }
        })
      }
    },
    passReport() {
      this.checkReport({
        reportId: this.healthId,
        status: 1
      })
    },
    rejectReport() {
      this.$prompt('', '请填写驳回理由', {
        confirmButtonText: '驳回',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputPattern: /^.{1,20}$/,
        inputErrorMessage: '理由不能为空且最多20个字',
        inputPlaceholder: '注意：驳回理由不能为空',
        confirmButtonClass: 'messageBoxButton',
        customClass: 'reject-reason-prompt',
        message:
          '<div style="font-size:12px; color:#fd7715"><i class="el-icon-warning" style="margin-right:6px;"></i>驳回后无法撤销，请确保已仔细审核所有体检信息</div>',
        dangerouslyUseHTMLString: true
      })
        .then(({ value }) => {
          this.checkReport({
            reportId: this.healthId,
            status: -1,
            checkReason: value
          })
        })
        .catch(() => {
          console.log('取消操作')
        })
    },
    playerIsReady(player) {
      const hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function (options) {
        return options
      }
      player.on('error', function () {
        player.errorDisplay.contentEl().innerHTML = '视频加载失败'
      })
      player.markers({
        markerStyle: {
          'background-color': '#fff'
        },
        markerTip: {
          display: true,
          text: function (marker) {
            const seconds = parseInt(marker.time % 60)
            const minutes = parseInt(marker.time / 60) % 60
            return `${marker.text}
                    ${minutes < 10 ? '0' + minutes : minutes}:${
              seconds < 10 ? '0' + seconds : seconds
            }`
          },
          time: function (marker) {
            return marker.time
          }
        },
        markers:
          this.activeDirection == 'front'
            ? this.videoFrontDots
            : this.videoBackDots,
        onMarkerClick: function (marker) {
          return false
        }
      })
      let currentTime = 0
      if (this.activeType != -1) {
        currentTime = this.videoDots[this.activeType].time / 1000
      }
      this.player.currentTime(currentTime)
      this.player.play()
    },
    handleClickVideoBtn(index, direction) {
      this.activeType = index
      if (direction != this.activeDirection) {
        this.activeDirection = direction
        this.getVideoUrl(-1)
      } else {
        let currentTime = 0
        if (index != -1) {
          currentTime = this.videoDots[index].time / 1000
        }
        this.player.currentTime(currentTime)
        this.player.play()
      }
    },
    openViewer(index) {
      this.showIndex = index
      this.keyImagesTitle = this.keyImages[index].title
      this.keyImagesUrl = this.keyImagesCopyUrl
        .slice(index)
        .concat(this.keyImagesCopyUrl.slice(0, index))
      this.showViewer = true
      this.lastIndex = index
    },
    closeViewer() {
      this.showViewer = false
    },
    switchViewer(index) {
      const newIndex = (this.showIndex + index) % this.keyImagesUrl.length
      console.log('上一个坐标' + this.lastIndex)
      console.log('当前坐标' + newIndex)
      if (newIndex > this.lastIndex) {
        if (newIndex == this.keyImagesUrl.length) {
          this.$message({
            message: '当前已回到第一页',
            type: 'warning'
          })
        }
      } else {
        if (newIndex == 0) {
          this.$message({
            message: '当前已回到第一页',
            type: 'warning'
          })
        }
      }
      this.keyImagesTitle = this.keyImages[newIndex].title
      this.lastIndex = newIndex
    }
  }
}
</script>

<style lang="scss">
.isPlatformMainContainer {
  margin-top: 0 !important;
  left: 0 !important;
  top: 0 !important;
  padding-right: 0 !important;
  background-color: #fff;
}
.isPlatformForBorder {
  border-radius: 4px 4px 0 0;
}
.isPlatformMainContainerWidth {
  width: 99% !important;
}
.isPlatformPart {
  /*border-bottom: 1px solid #edeef2;*/
  border-right: 1px solid #edeef2;
}
.el-image-viewer__canvas .el-image-viewer__img {
  max-width: 75% !important;
  max-height: 75% !important;
}
.isPlatformPartTopBorder {
  border-top: 1px solid #edeef2;
  margin-top: 0 !important;
}
.el-dialog__footer {
  text-align: center;
}
.checkDetailTop {
  height: 450px !important;
}
.checkDetailLeft {
  height: 310px !important;
  p {
    margin-bottom: 22px !important;
  }
}
.isCheckDetailRight {
  flex: 0 0 320px !important;
}
.isMangShenRight {
  flex: 0 0 410px !important;
}
.isCheckDetailMarginTop {
  margin-top: 40px;
}
.isMangShenSetHeightAndWidth {
  height: 117px !important;
  width: 81px !important;
}
.isPlatformMarginTop {
  right: -30px !important;
  border-top: 1px solid #dcdcdc;
  top: -2px !important;
}
.isPlatformInfoImg {
  bottom: 25% !important;
}
.isPlatformPartContent {
  position: relative;
}
.isPlatformEllipsis {
  position: absolute;
  min-width: 209px;
}
.isPlatformResultBtn {
  align-items: flex-start !important;
  z-index: 2;
}
.isPlatformInfoParent p {
  margin-bottom: 12px !important;
}
.el-popover.big-popover {
  width: 344px;
  height: 261px;
  border: 2px solid #fd7715 !important;
  box-sizing: border-box;
  &.xc-popover {
    width: 230px;
    height: 304px;
  }
  .pop-area {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .popImg {
      max-width: 100%;
      max-height: 100%;
    }
  }
  &.el-popper[x-placement^='bottom'] .popper__arrow {
    border-bottom-color: #fd7715;
    &::after {
      top: 3px;
    }
  }
}
.hb-health-detail {
  background-color: #edeef2;
  .prev-next-group {
    display: inline-block;
    margin-left: 60px;
    .prev-next-btn {
      color: #409eff;
    }
  }
  .health-container {
    .row-container-top {
      height: 225px;
    }
    .row-container-bottom {
      height: 395px;
      box-sizing: border-box;
      margin-top: 20px;
    }
    .row-container-last {
      box-sizing: border-box;
      margin-top: 20px;
      margin-bottom: 20px;
      .bg-part {
        padding-bottom: 0;
      }
    }
    .col-container {
      height: 100%;
    }
    .common-title {
      margin-bottom: 20px;
      line-height: 16px;
      .descri {
        display: inline-block;
        background-color: #fd7715;
        width: 4px;
        height: 16px;
        margin-right: 5px;
        vertical-align: text-top;
      }
      .title-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .descri {
          display: inline-block;
          background-color: #fd7715;
          width: 4px;
          height: 16px;
          margin-right: 5px;
          vertical-align: text-top;
        }
        .result-btn {
          height: 100%;
          display: flex;
          align-items: center;
          margin-left: 25px;
          .el-button {
            color: #fd7715;
            height: 24px;
            font-weight: normal;
            font-stretch: normal;
            padding: 5px 9px;
            background-color: rgba(253, 119, 21, 0.1);
            border-color: rgba(253, 119, 21, 0.1);
            &.is-disabled {
              background-color: #fff;
              border-color: #ebeef5;
              color: #c0c4cc;
            }
          }
          .active {
            color: #fff;
            background: #fd7715;
            border-color: #fd7715;
          }
        }
      }
      .update-wrap {
        display: flex;
        flex-direction: row;
        justify-content: start;
        .descri {
          display: inline-block;
          background-color: #fd7715;
          width: 4px;
          height: 16px;
          margin-right: 5px;
          vertical-align: text-top;
        }
        .result-btn {
          height: 100%;
          display: flex;
          align-items: center;
          margin-left: 15px;
          margin-top: -3px;
          .el-button {
            font-weight: normal;
            font-stretch: normal;
            color: #fd7715;
            background-color: rgba(253, 119, 21, 0.1);
            border-color: rgba(253, 119, 21, 0.1);
            padding: 5px 9px;
            &.is-disabled {
              background-color: #fff;
              border-color: #ebeef5;
              color: #c0c4cc;
            }
          }
          .active {
            color: #fff;
            background: #fd7715;
            border-color: #fd7715;
          }
        }
      }
      .title-font {
        font-size: 16px;
        font-weight: bold;
      }
      .license-type-out {
        height: 31px;
        border: solid 2px #fd7715;
        display: inline-block;
        text-align: center;
        padding: 0 5px;
        .license-type-inner {
          display: inline-block;
          height: 21px;
          margin-top: 4px;
          padding: 0 5px;
          line-height: 21px;
          text-align: center;
          border: solid 1px #fd7715;
          font-size: 14px;
          font-weight: bold;
          color: #fd7715;
        }
      }
    }
    .bg-part {
      height: 100%;
      min-height: 225px;
      border-radius: 4px;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 15px 20px 30px 20px;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .user-info {
      height: 100%;
      display: flex;
      justify-content: space-between;
      padding-top: 4px;
      .left {
        height: 140px;
        overflow: hidden;
        // justify-content: space-between;
        align-content: space-between;
        font-size: 12px;
        label {
          color: #999999;
        }
        p {
          line-height: 13px;
          margin-bottom: 15px;
          white-space: nowrap;
          overflow: hidden;
          vertical-align: top;
          text-overflow: ellipsis;
        }
      }
      .right {
        flex: 0 0 321px;
        .pic-one {
          width: 95px;
          height: 140px;
          position: relative;
          display: inline-block;
          margin-right: 7px;
          vertical-align: top;
          &.last-one {
            width: 100px;
          }
          .camera-area {
            width: 100%;
            height: 100%;
            background-color: #ededed;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: 1px solid #ccc;
            &.camera-top {
              height: 76px;
            }
            &.camera-bottom {
              box-sizing: border-box;
              height: 55px;
              background-color: #fff;
              margin-top: 9px;
              border: 1px solid #dedede;
            }
            .camera {
              max-width: 100%;
              max-height: 100%;
            }
          }
          .pic-text {
            position: absolute;
            display: inline-block;
            width: 100%;
            text-align: center;
            top: -25px;
            left: 0;
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
    }
    .check-info {
      height: 100%;
      padding-top: 4px;
      .info-parent {
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        position: relative;
        p {
          margin-bottom: 20px;
        }
        label {
          color: #999999;
        }
        .info-img {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
      .auto-reject {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .uncheck-info {
      height: 100%;
      display: flex;
      justify-content: center;
      padding-left: 7px;
      padding-right: 24px;
      &.no-pay-parent {
        padding: 0;
      }
      .no-pay {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
        .el-icon-warning {
          font-size: 24px;
          color: #fd7715;
        }
        .danger {
          margin-top: 5px;
          font-size: 14px;
          color: #ef4646;
          font-weight: bold;
        }
        .ordinary {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 7px;
        }
      }
      .left {
        width: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .el-button {
          text-indent: 7px;
          letter-spacing: 7px;
          font-size: 14px;
          &.passBtn {
            background-color: #67c23a;
            color: #fff;
          }
          &.rejectBtn {
            background-color: #f46161;
            color: #fff;
            margin-top: 15px;
            margin-left: 0;
          }
        }
      }
      .right {
        width: 120px;
        padding: 0 23px;
        background: #f7f7f7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .el-icon-warning {
          font-size: 24px;
          color: #fd7715;
        }
        .danger {
          margin-top: 5px;
          font-size: 14px;
          color: #fd7715;
        }
        .ordinary {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 7px;
        }
      }
    }
    .video-info {
      height: 314px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      color: #fff;
      .video-player-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .video-js.vjs-fluid {
          height: 100%;
          padding-top: 0;
        }
        .video-js.vjs-error .vjs-big-play-button {
          display: none !important;
        }
        .vjs-control {
          height: auto;
        }
        .vjs-control-bar {
          height: 43px;
        }
        .vjs-button > .vjs-icon-placeholder:before {
          font-size: 20px;
          line-height: 43px;
        }
        .vjs-progress-control.vjs-control {
          position: absolute;
          left: 0;
          bottom: 43px;
          width: 100%;
          .vjs-play-progress {
            background-color: #fd7715;
            .vjs-time-tooltip {
              display: none !important;
            }
          }
          .vjs-progress-holder {
            margin: 0;
          }
        }
        .vjs-slider-vertical .vjs-volume-level:before {
          left: -0.38em !important;
        }
        .vjs-fullscreen-control {
          position: absolute;
          right: 0;
        }
        .vjs-volume-panel {
          position: absolute;
          right: 42px;
        }
        .vjs-playback-rate {
          position: absolute;
          right: 84px;
          height: 43px;
        }
        .vjs-playback-rate .vjs-playback-rate-value {
          font-size: 1em !important;
          line-height: 3 !important;
          color: #fd7715;
        }
        .vjs-time-divider,
        .vjs-duration-display {
          color: #706e6d !important;
        }
        &.vjs-custom-skin > .video-js .vjs-volume-level {
          background-color: #fd7715;
        }
        .vjs-menu {
          .vjs-menu-item.vjs-selected {
            background-color: #fd7715;
            color: #fff;
          }
        }
        .video-js .vjs-control:focus:before,
        .video-js .vjs-control:hover:before,
        .video-js .vjs-control:focus {
          outline: none;
        }
        .vjs-tip {
          width: 117px;
          height: 80px;
          box-sizing: border-box;
          border: 1px solid #fd7715;
          background: #999;
          padding: 0;
          opacity: 1;
          .vjs-tip-arrow {
            display: none;
          }
          .vjs-tip-inner {
            border-radius: 0;
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 3px 5px;
            text-align: left;
            font-size: 12px;
            font-weight: normal;
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .result-info {
      height: 100%;
      margin-top: 15px;
      .el-divider--horizontal {
        margin: 0 0;
      }
      .result-item {
        height: 70px;
        display: flex;
        margin-top: 10px;
        .img-cover {
          flex: 0 0 123px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          border: 1px solid #ccc;
          background-color: #ededed;
          margin-right: 16px;
          img {
            max-width: 100%;
            max-height: 100%;
            width: 100%\9;
          }
        }
        .result-content {
          flex: auto;
          width: 100px;
          .part-title {
            font-size: 14px;
            font-weight: bold;
          }
          .part-content {
            line-height: 20px;
            width: 100%;
            font-size: 12px;
            color: #666666;
            p {
              width: 100%;
            }
          }
        }
        .result-btn {
          height: 100%;
          display: flex;
          align-items: center;
          margin-left: 25px;
          .el-button {
            font-weight: bold;
            color: #fd7715;
            background-color: rgba(253, 119, 21, 0.1);
            border-color: rgba(253, 119, 21, 0.1);
            &.is-disabled {
              background-color: #fff;
              border-color: #ebeef5;
              color: #c0c4cc;
            }
          }
          .active {
            color: #fff;
            background: #fd7715;
            border-color: #fd7715;
          }
        }
      }
    }
    .result-pic {
      position: absolute;
      top: 0;
      right: 0;
    }
    .key-image-info {
      .no-result {
        width: 100%;
        height: 144px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
      }
      .has-result {
        width: calc(100% + 21px);
        .key-image-one {
          width: 170px;
          margin-right: 20px;
          display: inline-block;
          .key-el-image {
            width: 100%;
            height: 95px;
            box-sizing: border-box;
            transition: all ease 0.5s;
            .el-image__inner:hover {
              box-sizing: border-box;
              border: 1px solid #fd7715;
            }
          }
          .image-slot {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          .title {
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            text-align: center;
            margin: 15px auto 20px auto;
            img {
              display: block;
              width: 18px;
              height: 18px;
              margin-right: 5px;
            }
          }
        }
        .preview-title {
          position: fixed;
          z-index: 2001;
          display: inline-block;
          left: 50%;
          top: 30px;
          transform: translateX(-50%);
          width: 282px;
          height: 44px;
          line-height: 44px;
          vertical-align: middle;
          padding: 0 23px;
          background-color: #606266;
          border-color: #fff;
          border-radius: 22px;
          color: #fff;
          opacity: 0.8;
          text-align: center;
          font-size: 18px;
        }
        .el-image-viewer__wrapper {
          .el-image-viewer__actions {
            margin-left: -23px;
          }
          .el-image-viewer__close {
            width: 44px;
            height: 44px;
            background-color: #606266;
            color: #fff;
            font-size: 24px;
            .el-icon-circle-close:before {
              content: '\e6db';
            }
          }
        }
      }
    }
  }
}
</style>
