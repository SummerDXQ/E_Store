<template>
  <div class="profile">
    <el-row>
      <el-col :xs="24">
        <div class="title">USER PROFILE</div>
      </el-col>
    </el-row>
    <div class="userInfo" v-if="userInfo">
      <el-row v-if="userInfo.name">
        <el-col
          :xs="{ span: 5 }"
          :sm="{ span: 3, offset: 1 }"
          :md="{ span: 4, offset: 2 }"
          :lg="{ span: 2, offset: 5 }"
          :xl="{ span: 2, offset: 5 }"
        >
          <span>First Name:</span>
        </el-col>
        <el-col :xs="17" :sm="8" :md="7" :lg="6" :xl="6">
          <el-input
            placeholder="Please input first name"
            v-model="userInfo.name.firstname"
          ></el-input>
        </el-col>
      </el-row>

      <el-row v-if="userInfo.name">
        <el-col
          :xs="{ span: 5 }"
          :sm="{ span: 3, offset: 1 }"
          :md="{ span: 4, offset: 2 }"
          :lg="{ span: 2, offset: 5 }"
          :xl="{ span: 2, offset: 5 }"
        >
          <span>Last Name:</span>
        </el-col>
        <el-col :xs="17" :sm="8" :md="7" :lg="6" :xl="6">
          <el-input
            placeholder="Please input last name"
            v-model="userInfo.name.lastname"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :xs="{ span: 5 }"
          :sm="{ span: 3, offset: 1 }"
          :md="{ span: 4, offset: 2 }"
          :lg="{ span: 2, offset: 5 }"
          :xl="{ span: 2, offset: 5 }"
        >
          <span>Email:</span>
        </el-col>
        <el-col :xs="17" :sm="8" :md="7" :lg="6" :xl="6">
          <el-input
            placeholder="Please input email"
            v-model="userInfo.email"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :xs="{ span: 5 }"
          :sm="{ span: 3, offset: 1 }"
          :md="{ span: 4, offset: 2 }"
          :lg="{ span: 2, offset: 5 }"
          :xl="{ span: 2, offset: 5 }"
        >
          <span>Username:</span>
        </el-col>
        <el-col :xs="17" :sm="8" :md="7" :lg="6" :xl="6">
          <el-input
            placeholder="Please input username"
            v-model="userInfo.username"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :xs="{ span: 5 }"
          :sm="{ span: 3, offset: 1 }"
          :md="{ span: 4, offset: 2 }"
          :lg="{ span: 2, offset: 5 }"
          :xl="{ span: 2, offset: 5 }"
        >
          <span>Phone:</span>
        </el-col>
        <el-col :xs="17" :sm="8" :md="7" :lg="6" :xl="6">
          <el-input
            placeholder="Please input phone"
            v-model="userInfo.phone"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :xs="{ span: 5 }"
          :sm="{ span: 3, offset: 1 }"
          :md="{ span: 4, offset: 2 }"
          :lg="{ span: 2, offset: 5 }"
          :xl="{ span: 2, offset: 5 }"
        >
          <span>Password:</span>
        </el-col>
        <el-col :xs="17" :sm="8" :md="7" :lg="6" :xl="6">
          <el-input
            placeholder="Please input password"
            v-model="userInfo.password"
            type="password"
          ></el-input>
        </el-col>
      </el-row>

      <el-row v-if="userInfo.address">
        <el-col
          :xs="{ span: 5 }"
          :sm="{ span: 3, offset: 1 }"
          :md="{ span: 4, offset: 2 }"
          :lg="{ span: 2, offset: 5 }"
          :xl="{ span: 2, offset: 5 }"
        >
          <span>Address:</span>
        </el-col>
        <el-col :xs="17" :sm="4" :md="3" :lg="2" :xl="2">
          <el-input
            placeholder="Unit NO."
            v-model="userInfo.address.number"
          ></el-input>
        </el-col>
        <el-col :xs="{ span: 17, offset: 5 }" :sm="3" :md="3" :lg="2" :xl="2">
          <el-input
            placeholder="Street"
            v-model="userInfo.address.street"
          ></el-input>
        </el-col>
        <el-col :xs="{ span: 17, offset: 5 }" :sm="3" :md="3" :lg="2" :xl="2">
          <el-input
            placeholder="City"
            v-model="userInfo.address.city"
          ></el-input>
        </el-col>
        <el-col :xs="{ span: 17, offset: 5 }" :sm="3" :md="3" :lg="3" :xl="2">
          <el-input
            placeholder="Zipcode"
            v-model="userInfo.address.zipcode"
          ></el-input>
        </el-col>
        <el-col :xs="{ span: 17, offset: 5 }" :sm="3" :md="3" :lg="2" :xl="2">
          <el-input
            placeholder="Latitude"
            v-model="userInfo.address.geolocation.lat"
          ></el-input>
        </el-col>
        <el-col :xs="{ span: 17, offset: 5 }" :sm="3" :md="3" :lg="2" :xl="2">
          <el-input
            placeholder="Longitude"
            v-model="userInfo.address.geolocation.long"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" class="button">
          <el-button type="primary" @click="update">Update</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Profile",
  beforeRouteEnter(to, from, next) {
    // hide searchBar,sorting and filter
    next((vm) => {
      if (vm.showSearchBar) {
        vm.changeShowSearchBar(false);
      }
      if (vm.showSorting) {
        vm.changeShowSorting(false);
      }
      if (vm.showFilter) {
        vm.changeShowFilter(false);
      }
    });
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    ...mapState(["showSearchBar", "showSorting", "showFilter"]),
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    ...mapActions([
      "getUserInfo",
      "updateUserInfo",
      "changeShowSearchBar",
      "changeShowSorting",
      "changeShowFilter",
    ]),
    // update userInfo
    update() {
      // here we need to do more to validate user info(depends on requirements)
      let data = {
        email: this.userInfo.email,
        username: this.userInfo.username,
        password: this.userInfo.password,
        name: {
          firstname: this.userInfo.name.firstname,
          lastname: this.userInfo.name.lastname,
        },
        address: {
          city: this.userInfo.address.city,
          street: this.userInfo.address.street,
          number: this.userInfo.address.number,
          zipcode: this.userInfo.address.zipcode,
          geolocation: {
            lat: this.userInfo.address.geolocation.lat,
            long: this.userInfo.address.geolocation.long,
          },
        },
        phone: this.userInfo.phone,
      };
      this.updateUserInfo(data);
    },
  },
};
</script>

<style lang="less">
.profile {
  padding: 20px 0;
  color: #343a40;
  .title {
    font-size: 30px;
    text-align: left;
    margin-bottom: 20px;
  }
  .userInfo {
    .el-row {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    .button {
      margin-top: 20px;
      text-align: center;
      .el-button {
        background: #343a40;
        outline: none;
        border: none;
        width: 30%;
      }
    }
  }
  @media (max-width: 767px) {
    .userInfo,
    .el-input {
      font-size: 10px;
    }
  }
}
</style>
