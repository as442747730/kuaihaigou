<style lang="less" scoped>
.u-tab-select {
  height: 76px;

  .select-wrapper {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    background: white;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 34;

    .select-item {
      font-size: 13px;
      color: @cor_999;
      line-height: 1;
      padding: 15px 0;

      &:after {
        content: '';
        margin-left: 5px;
        display: inline-block;
        width: 12px;
        height: 13px;
        vertical-align: top;
        background-image: url("~/assets/img/Icons/ic_triangle_bt_12x12@2x.png");
        background-size: 80% auto;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.5;
        transition: .2s;
      }

      &.active {
        color: @cor_333;
        font-weight: bold;

        &:after {
          opacity: 1;
          transform: rotate(180deg);
        }
      }
    }
  }

  .filter-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: @cor_border;
    font-size: 13px;
    color: @cor_999;
    position: fixed;
    top: 43px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 32;

    .new {
      &::after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        background-image: url(~/assets/img/order/icon-arrow.png);
        background-position: center;
        background-size: 12px;
        background-repeat: no-repeat;
        transform: rotate(90deg);
        margin-left: 6px;
      }
    }
  }

  .drop-wrapper-select {
    width: 100%;
    position: fixed;
    z-index: 33;
    top: 43px;

    .drop-wrapper-body {
      background: white;
      padding: 20px 10px 20px 10px;
      display: flex;
      flex-wrap: wrap;

      .label {
        width: 100px;
        margin: 0 9px;
        margin-bottom: 15px;

        &.small {
          width: 70px;
        }

        border: 1PX solid #EEEEEE;
        color: @cor_999;
        text-align: center;
        font-size: 13px;
        border-radius: 4px;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.active {
          border-color: @cor_333;
          color: @cor_333;
          font-weight: bold;
        }
      }
    }

    .drop-wrapper-bottom {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      display: flex;

      .btn {
        flex: 1;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        font-weight: bold;
        color: @nice-blue;
        background: white;
        text-align: center;

        &.co {
          background: @nice-blue;
          color: white;
        }
      }
    }
  }

  .drop-wrapper-option {
    width: 100%;
    position: fixed;
    z-index: 31;
    top: 76px;
    left: 0;
    background: white;

    .drop-wrapper-body {
      padding: 16px 0;

      .option-item {
        text-align: center;
        font-size: 13px;
        color: @cor_999;
        padding: 16px 0;

        &.active {
          color: @cor_333;
          font-weight: bold;
        }
      }
    }
  }

  .modal {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100vh;
  }
}
</style>