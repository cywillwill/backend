import nodemailer from "nodemailer";
// async..await is not allowed in global scope, must use a wrapper
async function send(sendInfo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "1005739128@qq.com", // generated ethereal user
      pass: "gmlndvnaqldrbbie", // generated ethereal password
    },
  });

//   const sendInfo = {
//     user: "",
//     to: "1005739128@qq.com",
//     expire: '2020-7-1'
//   };

  const url = "https://baidu.com";

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: " test <1005739128@qq.com>", // sender address
    to: sendInfo.to, // list of receivers
    subject: "找回密码", // Subject line
    text: "no reply", // plain text body
    html: `
      <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">
          Imooc社区——欢迎来到官方社区
        </div>
        <div style="padding: 25px">
          <div>
            您好，${sendInfo.user}用户，重置链接有效时间30分钟，请在${sendInfo.expire}之前重置您的密码：
          </div>
          <a
            href="${url}"
            style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;"
          >
            立即重置密码
          </a>
          <div style="padding: 5px; background: #f2f2f2;">
            如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。
          </div>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">
          系统邮件，请勿直接回复
        </div>
      </div>
    `, // html body
  });

  return '邮件发送成功'
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}
export default send;
