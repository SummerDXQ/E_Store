<template>
  <div class="cart">
    <span class="title">SHOOPPING CART</span>
    <!-- <el-row>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="logo">
        <span>E_STORE</span>
      </el-col>
    </el-row> -->

    <!-- <el-row v-for="item in cartInfo" :key="item.id">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="logo">
        <span>E_STORE</span>
      </el-col>
    </el-row> -->
    <el-row class="cart_detail">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
        <ul>
          <li v-for="item in cartInfo" :key="item.id">
            <div class="date">
              Date: {{ moment(item.date).format("DD/MM/YYYY h:mm a") }}
            </div>
            <div
              v-for="subItem in item.products"
              :key="subItem.productId + item.date"
            >
              <el-row>
                <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                  <div class="image">
                    <img
                      :src="allProducts[subItem.productId - 1].image"
                      alt=""
                    />
                  </div>
                </el-col>
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                  <span>{{ allProducts[subItem.productId - 1].title }}</span>
                </el-col>

                <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                  <span>{{ subItem.quantity }}</span>
                </el-col>
              </el-row>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="total">
        <div>TOTAL () ITEMS</div>
        <div></div>
        <el-button type="primary">CHECKOUT</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "Cart",
  data() {
    return {
      moment: moment,
    };
  },
  computed: {
    ...mapState(["cartInfo", "allProducts"]),
    totalNumber() {},
    totalPrice() {},
  },
  created() {
    this.getCartInfo();

    // this.getProducts(); // 重复
  },
  methods: {
    ...mapActions(["getCartInfo"]),
    // async getCartInfo() {
    //   this.cartInfo = await this.$axios("/carts");
    //   console.log(this.cartInfo);
    // },
    // 重复
    // async getProducts() {
    //   let products = await this.$axios("/products");
    //   this.products = Object.freeze(products);
    //   console.log(this.products);
    // },
  },
};
</script>

<style lang="less">
.cart {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10px;
  text-align: center;
  .cart_detail {
    .title {
      font-size: 50px;
      // padding-bottom:20px ;
    }
    ul {
      width: 100%;
      margin-top: 30px;
      box-sizing: border-box;
      li {
        width: 100%;
        // margin-bottom: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        // text-align: left;
        .date {
          text-align: left;
        }
        .el-row {
          margin-bottom: 20px;
          // border: 1px solid #ccc;
          box-sizing: border-box;
          padding: 10px;
          display: flex;
          align-items: center;
          height: 100px;
          .el-col {
            height: 100%;
            line-height: 80px;
            .image {
              width: 50%;
              height: 100%;
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
          }
        }
      }
    }
  }
  .total {
    border: 1px solid #ccc;
    height: 100px;
    margin-top: 30px;
    padding: 10px;
  }
}
</style>
