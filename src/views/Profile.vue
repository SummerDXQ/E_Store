<template>
  <div class="profile">
    <el-row>
      <el-col :xs="24">
        <div class="title">USER PROFILE</div>
      </el-col>
    </el-row>
    <div class="userInfo" v-if="userInfo">
      <el-row v-if="userInfo.name">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span>First Name:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-input
            placeholder="Please input first name"
            v-model="userInfo.name.firstname"
          ></el-input>
        </el-col>
      </el-row>

      <el-row v-if="userInfo.name">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span>Last Name:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-input
            placeholder="Please input last name"
            v-model="userInfo.name.lastname"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span>Email:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-input
            placeholder="Please input email"
            v-model="userInfo.email"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span>Username:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-input
            placeholder="Please input username"
            v-model="userInfo.username"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span>Phone:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-input
            placeholder="Please input phone"
            v-model="userInfo.phone"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span>Password:</span>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-input
            placeholder="Please input"
            v-model="userInfo.password"
          ></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span>Address:</span>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input placeholder="Please input" v-model="number"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input placeholder="Please input" v-model="street"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input placeholder="Please input" v-model="city"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input placeholder="Please input" v-model="zipcode"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input
            placeholder="Please input"
            v-model="geolocation.lat"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-input
            placeholder="Please input"
            v-model="geolocation.long"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :xs="24">
        <el-button type="primary" @click="update">Update</el-button>
      </el-col>
    </el-row>
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
    },
    city: {
      get() {
        return this.userInfo.address.city;
      },
      set() {},
    },
    street: {
      get() {
        return this.userInfo.address.street;
      },
      set() {},
    },
    number: {
      get() {
        return this.userInfo.address.number;
      },
      set() {},
    },
    zipcode: {
      get() {
        return this.userInfo.address.zipcode;
      },
      set() {},
    },
    geolocation: {
      get() {
        return this.userInfo.address.geolocation;
      },
      set() {},
    },
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
          city: this.city,
          street: this.street,
          number: this.number,
          zipcode: this.zipcode,
          geolocation: {
            lat: this.geolocation.lat,
            long: this.geolocation.long,
          },
        },
        phone: this.userInfo.phone,
      };
      // console.log(data);
      // this.updateUserInfo(data);
      fetch("https://fakestoreapi.com/users/7", {
        method: "PATCH",
        body: JSON.stringify({
          email: "John@gmail.com",
          username: "johnd",
          password: "m38rmF$",
          name: {
            firstname: "John",
            lastname: "Doe",
          },
          address: {
            city: "kilcoole",
            street: "7835 new road",
            number: 3,
            zipcode: "12926-3874",
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: "1-570-236-7033",
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
    },
  },
};
</script>

<style lang="less">
.profile {
  padding: 10px;
  .title {
    font-size: 50px;
    text-align: center;
  }
  .userInfo {
    .el-row {
      margin-bottom: 10px;
    }
  }
}
</style>
