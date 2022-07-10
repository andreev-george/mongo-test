import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegister,
  fetchUserData,
  logout,
  selectIsAuth,
} from "../../redux/slices/auth";
import { ClientJS } from "clientjs";

export const Header = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const dispatch = useDispatch();

  const client = new ClientJS();
  const fingerprint = client.getBrowserData().ua;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      devices: fingerprint,
    },
    mode: "onSubmit",
  });

  const onSubmitSignin = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    console.log(values);
    setShowSignin(false);
    window.location.reload();
  };

  const onSubmitSignup = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    setShowSignup(false);
    window.location.reload();
  };
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setShowSignin(!showSignin);
                    setShowSignup(false);
                  }}
                  variant="outlined"
                >
                  Войти
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowSignup(!showSignup);
                    setShowSignin(false);
                  }}
                >
                  Зарегистрироваться
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
      {showSignup && (
        <div>
          <form onSubmit={handleSubmit(onSubmitSignup)} className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <p style={{ color: "red" }}>{errors.email?.message}</p>
            <input
              className={styles.input}
              id="email"
              {...register("email", { required: "укажите почту" })}
              placeholder="mail@mail.ru"
            />
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <p style={{ color: "red" }}>{errors.password?.message}</p>

            <input
              className={styles.input}
              id="password"
              {...register("password", { required: "укажите пароль" })}
              type="password"
              placeholder="********"
            />
            <input
              className={styles.submitInput}
              type="submit"
              value="Зарегистрироваться"
            />
          </form>
        </div>
      )}
      {showSignin && (
        <div>
          <form onSubmit={handleSubmit(onSubmitSignin)} className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <p style={{ color: "red" }}>{errors.email?.message}</p>

            <input
              className={styles.input}
              id="email"
              {...register("email", { required: "укажите почту" })}
              placeholder="mail@mail.ru"
            />
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <input
              className={styles.input}
              id="password"
              {...register("password", { required: "укажите пароль" })}
              type="password"
              placeholder="********"
            />
            <input className={styles.submitInput} type="submit" value="Войти" />
          </form>
        </div>
      )}
    </div>
  );
};
