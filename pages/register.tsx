import { useRouter } from "next/router";
import { useState } from "react";
import { useRegister } from "../src/hooks/auth/useRegister";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useRegister();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState("");

  const onSubmit = () => {
    setLoading(!isLoading);

    if (!name || !email || !password) {
      alert("Please enter information");
      setLoading(true);

    } else {
      register(name, email, password)
        .then((res) =>{
          setLoading(false);

          if(res.id != null){
            router.push("/products");
          }
          else{
            setError(res.error);
          }
        } )
        .catch((e) =>{
          setLoading(false);
          alert(e)
        });
    }
  };

  return (
    <div className="form w-screen h-screen flex items-center justify-center">
      <div className="h-fit flex flex-col gap-2">
        <p className="text-2xl font-bold">Register Form</p>
        <label>Username</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-80 h-8 px-2 border border-solid border-black rounded"
          placeholder="username"
        />
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-80 h-8 px-2 border border-solid border-black rounded"
          placeholder="email"
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
          Register
        </button>

        <div className="error" dangerouslySetInnerHTML={{__html: hasError}}></div>
      </div>

      <div className={isLoading ? 'loading visible': 'loading'}><div className="dual-ring"></div></div>

    </div>
  );
}
