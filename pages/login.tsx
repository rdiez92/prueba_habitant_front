import { useRouter } from "next/router";
import { useState } from "react";
import { useLogin } from "../src/hooks/auth/useLogin";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState("");

  const onSubmit = () => {
    setLoading(true);

    if (!name || !password) {
      alert("Please enter information");
      setLoading(!isLoading);
    } else {
      login(name, password)
        .then((res) => {
          setLoading(false);
          if(res.id != null){
            router.push("/products");
          }
          else{
            setError(res.error);
          }
        })
        .catch((e) =>{
          setLoading(false);
          alert(e)
        });
    }
  };

  return (
    <div className="form w-screen h-screen flex items-center justify-center">
      <div className="h-fit flex flex-col gap-2">
        <p className="text-2xl font-bold">Login Form</p>
        <label>Username</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-80 h-8 px-2 border border-solid border-black rounded"
          placeholder="username"
        />
        <label className="mt-4">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-80 h-8 px-2 border border-solid border-black rounded"
          placeholder="password"
          type="password"
        />
        <button
          onClick={onSubmit}
          className="h-10 w-80 mt-8 bg-black rounded text-white"
        >
          Login
        </button>

        <div className="error" dangerouslySetInnerHTML={{__html: hasError}}></div>
      </div>
      <div className={isLoading ? 'loading visible': 'loading'}><div className="dual-ring"></div></div>
    </div>
  );
}
