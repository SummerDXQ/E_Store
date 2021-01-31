<template>
  <div class="profile">
    <el-row>
      <el-col :xs="24">
        <div class="title">USER PROFILE</div>
      </el-col>
    </el-row>
    <div class="userInfo" v-if="userInfo">
      <el-row v-if="userInfo.name">
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <span>First Name:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="6" :xl="6">
          <el-input
            placeholder="Please input first name"
            v-model="userInfo.name.firstname"
          ></el-input>
        </el-col>
      </el-row>

      <el-row v-if="userInfo.name">
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <span>Last Name:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="6" :xl="6">
          <el-input
            placeholder="Please input last name"
            v-model="userInfo.name.lastname"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <span>Email:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="6" :xl="6">
          <el-input
            placeholder="Please input email"
            v-model="userInfo.email"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <span>Username:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="6" :xl="6">
          <el-input
            placeholder="Please input username"
            v-model="userInfo.username"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <span>Phone:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="6" :xl="6">
          <el-input
            placeholder="Please input phone"
            v-model="userInfo.phone"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <span>Password:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="6" :xl="6">
          <el-input
            placeholder="Please input password"
            v-model="userInfo.password"
          ></el-input>
        </el-col>
      </el-row>

      <el-row v-if="userInfo.address">
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <span>Address:</span>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <el-input
            placeholder="Unit NO."
            v-model="userInfo.address.number"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <el-input
            placeholder="Street"
            v-model="userInfo.address.street"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <el-input
            placeholder="City"
            v-model="userInfo.address.city"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <el-input
            placeholder="Zipcode"
            v-model="userInfo.address.zipcode"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <el-input
            placeholder="Latitude"
            v-model="userInfo.address.geolocation.lat"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
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
    <!-- <el-row>
      <el-col :xs="24">
        <el-button type="primary" @click="update">Update</el-button>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Profile",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUserInfo();
    });
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.userInfo;
      },
      set() {},
    }
  },
  methods: {
    ...mapActions(["getUserInfo", "updateUserInfo"]),
    update() {
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

      // console.log(data);
      this.updateUserInfo(data);

      // fetch("https://fakestoreapi.com/users/1", {
      //   method: "PUT",
      //   body: JSON.stringify({
      //     email: "John@gmail.com",
      //     username: "johnd",
      //     password: "m38rmF$",
      //     name: {
      //       firstname: "John",
      //       lastname: "Doe",
      //     },
      //     address: {
      //       city: "kilcoole",
      //       street: "7835 new road",
      //       number: 3,
      //       zipcode: "12926-3874",
      //       geolocation: {
      //         lat: "-37.3159",
      //         long: "81.1496",
      //       },
      //     },
      //     phone: "1-570-236-7033",
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((json) => console.log(json));
      // fetch("https://fakestoreapi.com/users/7", {
      //   method: "PATCH",
      //   body: JSON.stringify({
      //     email: "John@gmail.com",
      //     username: "johnd",
      //     password: "m38rmF$",
      //     name: {
      //       firstname: "John",
      //       lastname: "Doe",
      //     },
      //     address: {
      //       city: "kilcoole",
      //       street: "7835 new road",
      //       number: 3,
      //       zipcode: "12926-3874",
      //       geolocation: {
      //         lat: "-37.3159",
      //         long: "81.1496",
      //       },
      //     },
      //     phone: "1-570-236-7033",
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((json) => console.log(json));
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
    // font-weight: 600;
  }
  .userInfo {
    .el-row {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
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
}
</style>
