import { TextField, Stack, Container, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type FirstPageProps = {};

type FormValues = {
  name: string;
  phone: string;
  email: string;
};

const FirstPage: React.FC<FirstPageProps> = () => {
  let form = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const { register, handleSubmit } = form;
  const navigate = useNavigate();
  const submitHandler = (data: FormValues) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (data.name != "" && data.phone != "" && data.email != "") {
      if (!phoneRegex.test(data.phone)) {
        alert("Invalid phone number!");
      } 

      if (!emailRegex.test(data.email)) {
        alert("Invalid email address!");        
      } 

      if(phoneRegex.test(data.phone) && emailRegex.test(data.email))
      {
        localStorage.setItem("data", JSON.stringify(data));
        navigate("/second");
      }
      
    } else {
      alert("Every field is compulsory !");
    }
  };

  return (
    <Container>
      <form noValidate style={{ display: "flex", justifyContent: "center" }}>
        <Stack
          gap={4}
          width={"80vw"}
          height={"80vh"}
          boxShadow={2}
          style={{ background: "#2B2730", color: "whitesmoke" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h5">Fill your details</Typography>
          <TextField
            id="name"
            label="Name"
            variant="filled"
            color="primary"
            style={{
              backgroundColor: "white",
              borderRadius: "3px",
              width: "80%",
            }}
            {...register("name")}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="filled"
            color="primary"
            style={{
              backgroundColor: "white",
              borderRadius: "3px",
              width: "80%",
            }}
            {...register("phone")}
          />
          <TextField
            id="email"
            label="Email"
            variant="filled"
            color="primary"
            style={{
              backgroundColor: "white",
              borderRadius: "3px",
              width: "80%",
            }}
            {...register("email")}
          />
          <Button
            variant="contained"
            style={{ width: "20%" }}
            onClick={handleSubmit(submitHandler)}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default FirstPage;
