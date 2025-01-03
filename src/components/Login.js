import React, { useState } from "react";
import { loginAdmin } from "../api/api"; // API fonksiyonunu buradan alıyoruz
import { useNavigate } from "react-router-dom"; // Yönlendirme için useNavigate kullanıyoruz
import "./Login.css"; // CSS dosyasını yine dahil ediyoruz

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // Kullanıcı adı durumu
  const [password, setPassword] = useState(""); // Şifre durumu
  const [error, setError] = useState(""); // Hata mesajı durumu
  const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAdmin(username, password); // loginAdmin fonksiyonunu çağırıyoruz
      if (data.message === "Login Successful") {
        onLogin(true); // Giriş başarılı olduğunda onLogin fonksiyonu ile kullanıcıyı giriş yapmış olarak ayarlıyoruz
        localStorage.setItem("token", data.token); // Token'ı localStorage'a kaydediyoruz
        navigate("/dashboard"); // Giriş başarılı olduğunda Dashboard'a yönlendiriyoruz
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later."); // Hata mesajını gösteriyoruz
      console.error(err); // Hata için console log
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Hata varsa mesajı göster */}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Kullanıcı adını güncelle
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Şifreyi güncelle
          />
          <button type="submit" className="submit-button">Login</button> {/* Giriş butonu */}
        </form>
      </div>
    </div>
  );
};

export default Login;
