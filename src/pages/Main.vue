<template>
    <el-row class="container">
        <el-col :span="24" class="header" :style="{background:theme.bgColor}">
            <el-col :span="10" class="logo" :style="logoTheme" :class="collapsed?'logo-collapse-width':'logo-width'">
                {{collapsed?'':sysName}}
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="collapse">
                    <i class="el-icon-caret-left" :style="{color:theme.textColor}"></i>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner" :style="{color:theme.textColor}"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="_toBlog()">
                            <i class="el-icon-message" /> 我的博客</el-dropdown-item>
                        <el-dropdown-item @click.native="_toProfile()">
                            <i class="el-icon-edit" /> 个人中心</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout()">
                            <i class="el-icon-bell" /> 退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :background-color="theme.bgColor" :text-color="theme.textColor" :class="theme.mode=='dark'?'menu_dark':'menu_light'" :active-text-color="theme.activetext_color" v-bind:style=" collapsed ? {} : { 'width': '230px' } " :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf&&item.multi" :key="item.path+index">
                            <template slot="title">
                                <i :class="item.iconCls"></i>{{item.name}}
                            </template>
                            <template v-for="(subItem,i) in item.children">
                                <template v-if="subItem.children">
                                    <el-submenu :index="i+''" :key="subItem.path+i">
                                        <template slot="title">
                                            <i :class="subItem.iconCls"></i>{{ subItem.name }}
                                        </template>
                                        <el-menu-item v-for="(sonSubItem,r) in subItem.children" :index="sonSubItem.path" :key="sonSubItem.path+r">
                                            <i :class="sonSubItem.iconCls"></i>{{sonSubItem.name}}
                                        </el-menu-item>
                                    </el-submenu>
                                </template>
                                <template v-else>
                                    <el-menu-item :index="subItem.path" :key="subItem.path">
                                        <i :class="subItem.iconCls"></i>{{subItem.name}}
                                    </el-menu-item>
                                </template>
                            </template>
                        </el-submenu>
                        <el-submenu :index="index+''" v-if="!item.leaf&&!item.multi" :key="item.id">
                            <template slot="title">
                                <i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="item.id+child.path" v-if="!child.hidden">
                                <i :class="child.iconCls"></i>{{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.id" class="isleaf">
                            <i :class="item.iconCls"></i>{{item.children[0].name}}
                        </el-menu-item>
                    </template>
                </el-menu>
                <!--导航菜单-折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed el-menu-collapsed" :class="theme.mode =='dark'?'ul_dark':'ul_light'" v-show="collapsed" ref="menuCollapsed">
                    <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item li" :key="item.id">
                        <template v-if="!item.leaf">
                            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                                <i :class="item.iconCls"></i>
                            </div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                                <template v-if="!item.multi">
                                    <li v-for="child in item.children" :key="child.path" class="el-menu-item li" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">
                                        <i :class="child.iconCls"></i>{{child.name}}
                                    </li>
                                </template>
                                <template v-else>
                                    <li v-for="(child,i) in item.children" :key="child.path" class="el-menu-item li" style="padding-left: 40px" :class="$route.path==child.path?'is-active':''">
                                        <template v-if="!child.children" @click="$router.push(child.path)">
                                            <div @click="$router.push(child.path)">
                                                <i :class="child.iconCls"></i>{{child.name}}
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div @mouseover="showMenu(i,true)" @mouseout="showMenu(i,false)" :key="child.path+i">
                                                <i :class="child.iconCls"></i>{{child.name}}
                                            </div>
                                            <ul class="submenu" :class="'submenu-hook-'+i" @mouseover="showMenu(i,true)" @mouseout="showMenu(i,false)">
                                                <li v-for="subItem in child.children" v-if="!subItem.hidden" :key="subItem.path" class="el-menu-item li" style="margin-left:100px" :class="$route.path==subItem.path?'is-active':''" @click="$router.push(subItem.path)">
                                                    <i :class="subItem.iconCls"></i>{{subItem.name}}
                                                </li>
                                            </ul>
                                        </template>
                                    </li>
                                </template>
                            </ul>
                        </template>
                        <template v-else>
                            <li class="el-submenu">
                                <div class="el-submenu__title li" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
                                    <i :class="item.iconCls"></i>
                                </div>
                            </li>
                        </template>
                    </li>
                </ul>
                <div class="switch">
                    <el-switch v-model="themeSwitch" @change="changeTheme" active-value="light" inactive-value="dark">
                    </el-switch>
                </div>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
                            <el-breadcrumb-item :to="{ path: item.path }" v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data () {
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        return {
            theme: {
                bgColor: '#545c64',
                textColor: '#ffffff',
                activetext_color: '#ffd04b',
                mode: 'dark'
            },
            logoTheme: 'background: #545c64;color: #ffffff;',
            iconColor: 'color:#ffffff',
            sysName: 'VUEADMIN',
            collapsed: false,
            sysUserName: user.nickName,
            sysUserAvatar: user.portrait,
            themeSwitch: true,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        _toBlog: function () {
            this.$router.push('/main/blog')
        },
        _toProfile: function () {
            this.$router.push('/profile')
        },
        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                type: 'warning'
            }).then(() => {
                // sessionStorage.removeItem('user');
                _this.$router.push('/');
            }).catch(() => {

            });
        },
        //折叠导航栏
        collapse: function () {
            this.collapsed = !this.collapsed;
        },
        showMenu (i, status) {
            this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
        },
        changeTheme (value) {
            const dark = {
                bgColor: '#545c64',
                textColor: '#ffffff',
                activetext_color: '#ffd04b',
                mode: 'dark'
            }
            const light = {
                bgColor: '#ffffff',
                textColor: '#545c64',
                activetext_color: '#3ea6f7',
                mode: 'light'
            }
            const darklogo = 'background: #545c64;color: #ffffff;'
            const lightlogo = 'background: #ffffff;color: #545c64;'
            this.theme = (value == 'dark' ? dark : light)
            this.logoTheme = (value == 'dark' ? darklogo : lightlogo)
            this.iconColor = (value == 'dark' ? 'color:#ffffff' : 'color:#545c64')
        }
    },
}
</script>

<style scoped lang="scss">

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      /*侧边菜单*/
      .el-menu {
        height: 100%;
        background-color: #545c64;
        /*选中列*/
        .el-menu-item {
          background-color: #545c64;
        }
      }
      .menu_dark {
        i {
          color: #ffffff;
        }
        .isleaf.is-active {
          i {
            color: #ffca34;
          }
        }
        li {
          .is-active {
            i {
              color: #ffca34;
            }
          }
        }
      }
      .menu_light {
        i {
          color: #545c64;
        }
        .isleaf.is-active {
          i {
            color: #239cf7;
          }
        }
        li {
          .is-active {
            color: #239cf7;
            i {
              color: #239cf7;
            }
          }
        }
      }

      .ul_dark {
        background-color: #545c64;
        li:hover {
          background-color: #434a50;
        }
        .li {
          background: #545c64;
          color: #ffffff;
          .is-active {
            color: #ffca34;
            i {
              color: #ffca34;
            }
          }
        }
        i {
          color: #ffffff;
        }
      }
      .ul_light {
        background-color: #ffffff;
        li:hover {
          background-color: #eaeaeb;
        }
        .li {
          background-color: #ffffff;
          color: #545c64;
          .is-active {
            color: #239cf7;
            i {
              color: #239cf7;
            }
          }
        }
        i {
          color: #545c64;
        }
      }
      .switch {
        position: absolute;
        bottom: 4%;
        left: 10px;
      }
      .el-menu:first-child {
        overflow-y: auto !important;
      }
      /*当前选中菜单*/
      .is-opened {
        color: #fff;
        background-color: #fff;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      background-color: #fff;
      .breadcrumb-container {
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        box-sizing: border-box;
      }
    }
  }
}
</style>
