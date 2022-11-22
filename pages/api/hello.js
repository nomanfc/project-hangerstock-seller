// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res
    .status(200)
    .json({
      first_name: "dewan",
      last_name: "fmeadown",
      email: "ec2-ws20@da.com",
      phone: "01714533287",
    });
}