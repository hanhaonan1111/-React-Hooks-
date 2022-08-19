import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import style from "./login.module.scss";
import Input from "@/components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AsyncsendCode, AsyncLogin } from "@/store/action/login";
import { Toast } from "antd-mobile";
import { useHistory, useLocation } from "react-router-dom";
function Login() {
  let dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation<string>();

  let formik = useFormik({
    initialValues: {
      mobile: "15083097473",
      code: "246810",
    },
    // 提交表单
    onSubmit: async (data) => {
      await dispatch(AsyncLogin(data));

      if (location.state) {
        history.replace(location.state);
      } else {
        history.replace("/home/index");
      }
    },
    validationSchema: Yup.object().shape({
      // 手机号验证规则
      mobile: Yup.string()
        .required("手机号码不能为空")
        .matches(/^1[3-9]\d{9}$/, "手机号码格式有误")
        .length(11),
      // 手机验证码验证规则
      code: Yup.string()
        .required("验证码不能为空")
        .matches(/\d{6}$/, "手机号码格式有误")
        .length(6),
    }),
  });
  let {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    isValid,
  } = formik;
  let [time, setTime] = useState(60);
  //发送验证码
  async function SendCode() {
    if (time > 0 && time < 60) return;
    formik.setTouched({ mobile: true });
    if (!values.mobile) return;
    if (!/^1[3-9]\d{9}$/.test(values.mobile)) return;

    await dispatch(AsyncsendCode(values.mobile));
    Toast.success("发送验证码成功!");
    let timer = setInterval(() => {
      if (time < 0) {
        clearInterval(timer);
      }
      setTime((time) => time - 1);
    }, 1000);
  }

  return (
    <div className={style.root}>
      <NavBar />
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <div className="input-box">
              <Input
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Input>
            </div>
            {errors.mobile && touched.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>

          <div className="input-item">
            <div className="input-box">
              <Input
                onBlur={handleBlur}
                extra={time < 60 && time > 0 ? time + "s后重试" : "获取验证码"}
                name="code"
                value={values.code}
                onChange={handleChange}
                sendCode={SendCode}
              ></Input>
            </div>
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={["login-btn", `${!isValid ? "disabled" : ""}`].join(" ")}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
