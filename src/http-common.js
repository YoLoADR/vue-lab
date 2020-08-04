import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3300/",
  headers: {
    "Content-type": "application/json",
  }
});

// export default axios.create({
//   baseURL: "http://localhost:3300/",
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYdEZDSjNjcmRYTWl0QUFRbm1ZVyJ9.eyJpc3MiOiJodHRwczovL3lvaGFubi1yYXZpbm8uZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAwMTA0MzYzNDAxOTA1MTAyNjY3IiwiYXVkIjpbImh0dHBzOi8vZXhwcmVzcy5zYW1wbGUiLCJodHRwczovL3lvaGFubi1yYXZpbm8uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU5NjUyNDAyMiwiZXhwIjoxNTk2NjEwNDIyLCJhenAiOiJCS0ZyN3pkdTlmeG9DeXhWb1Y5RFRsTlE3ZW1MS0lQSiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.F9kmBQlOa4K3sWsYD2caZREfe9WpB84BsNxSLz4tUDsXUKSzWF-j9yp6ZZFSlqrlKKE0kXzNewhbRYc-pTtGObKw-qmC2tuTtLC3Bxili8CurLcx0EdYsjJyA8dpMilP8_lSI5HvHWKjY2b3rnqzcgiJSrmVrf8AKvof4bR_44_Qz4cb1IHtoVgy2klLZiuJ1YCQf4lOF_jDnDOb6l3QkTh0Zgcvs1P76UedjzptPUaHCAY0RLBEtN53UQLYXDCny4AWHjCW4OU3z9G-WEyRp-05u7R7zmk1uV4cBJJ_pZgQh8FI4nyOmTqvSWUdybItM8lz1bpEc_rEY64Ir_me_Q"
//   }
// });