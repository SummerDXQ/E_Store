<template>
  <div class="cart">
    <span class="title">SHOOPPING CART</span>
    <el-row class="cart_detail" v-if="cartInfo && allProducts">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
        <ul>
          <li v-for="item in cartInfo" :key="item.id">
            <div class="date">
              <span
                >Add to cart at:
                {{ moment(item.date).format("DD/MM/YYYY h:mm a") }}</span
              >
            </div>
            <div
              v-for="subItem in item.products"
              :key="subItem.productId + item.date"
            >
              <el-row>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <div class="image">
                    <img
                      :src="allProducts[subItem.productId - 1].image"
                      alt=""
                    />
                  </div>
                </el-col>
                <el-col
                  :xs="{ span: 18, offset: 1 }"
                  :sm="18"
                  :md="18"
                  :lg="18"
                  :xl="18"
                >
                  <span>{{ allProducts[subItem.productId - 1].title }}</span>
                </el-col>

                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <span class="quantity">{{ subItem.quantity }}</span>
                </el-col>
              </el-row>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col
        :xs="24"
        :sm="{ span: 7, offset: 1 }"
        :md="{ span: 7, offset: 1 }"
        :lg="{ span: 7, offset: 1 }"
        :xl="{ span: 7, offset: 1 }"
        class="total"
      >
        <div class="total_number">TOTAL ({{ totalNumber }}) ITEMS</div>
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
    totalNumber() {
      let total = 0;
      this.cartInfo.forEach((item) => {
        item.products.forEach((subItem) => {
          total += subItem.quantity;
        });
      });
      return total;
    },
    totalPrice() {},
  },
  created() {
    this.getCartInfo();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getAllProducts();
    });
  },
  methods: {
    ...mapActions(["getCartInfo", "getAllProducts"]),
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10px;
  color: #343a40;
  .title {
    font-size: 30px;
    text-align: left;
    margin-bottom: 20px;
  }
  .cart_detail {
    ul {
      width: 100%;
      margin-top: 30px;
      box-sizing: border-box;
      li {
        width: 100%;
        border: 1px solid #343a40;
        box-sizing: border-box;
        &:first-child {
          border-bottom: none;
        }
        .date {
          text-align: left;
          border-bottom: 1px solid #343a40;
          padding: 10px 0;
          span {
            padding-left: 10px;
            font-weight: 700;
          }
        }
        .el-row {
          box-sizing: border-box;
          padding: 10px;
          display: flex;
          align-items: center;
          height: 100px;
          .el-col {
            height: 100%;
            line-height: 40px;
            .image {
              width: 100%;
              height: 100%;
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
            .quantity {
              line-height: 80px;
            }
          }
          @media (max-width: 768px) {
            .el-col {
              line-height: 20px;
            }
          }
        }
      }
    }
  }
  .total {
    border: 1px solid #343a40;
    margin-top: 30px;
    padding: 20px;
    text-align: center;
    .total_number {
      margin-bottom: 20px;
      font-size: 20px;
    }
    .el-button {
      background: #343a40;
      border: none;
      outline: none;
    }
  }
}
</style>
