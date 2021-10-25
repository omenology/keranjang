import nodemailer from "nodemailer";
import { HOST_SMTP, PORT_SMTP } from "./constant";

export const trnsportMail = nodemailer.createTransport({
  host: HOST_SMTP,
  port: PORT_SMTP as number,
  secure: false,
  auth: {
    user: "xo4stlwaevociboe@ethereal.email",
    pass: "RyHSa1RQdqd51x8NTH",
  },
});

export const sendMail = (to: string, text: string) => {
  return trnsportMail.sendMail({
    from: '"Fred Foo 👻" <xo4stlwaevociboe@ethereal.email>',
    to,
    subject: "Hello ✔",
    text,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <meta charset="UTF-8"> <meta content="width=device-width, initial-scale=1" name="viewport"> <meta name="x-apple-disable-message-reformatting"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta content="telephone=no" name="format-detection"> <title></title><!--[if (mso 16)]> <style type="text/css"> a{text-decoration: none;}</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--></head><body> <div class="es-wrapper-color"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"><v:fill type="tile" color="#efefef"></v:fill></v:background><![endif]--> <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-email-paddings" valign="top"> <table cellpadding="0" cellspacing="0" class="es-header esd-header-popover" align="center"> <tbody> <tr> <td class="esd-stripe" esd-custom-block-id="6021" align="center"> <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" align="center"> <tbody> <tr> <td class="esd-structure es-p20" align="left" bgcolor="#efefef" style="background-color: #efefef;"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-container-frame" width="560" valign="top" align="center"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-block-image" align="center" style="font-size:0"><a href="https://viewstripo.email/" target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_b3156304f6ea49ad12cf8a28ac247f14/images/74601518438433060.png" alt="Financial logo" title="Financial logo" width="134"></a></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table class="es-content" cellspacing="0" cellpadding="0" align="center"> <tbody> <tr> <td class="esd-stripe" esd-custom-block-id="6023" align="center"> <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> <tbody> <tr> <td class="esd-structure es-p40t es-p40b es-p30r es-p30l" align="left"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-container-frame" esd-custom-block-id="11296" width="540" valign="top" align="center"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-block-text" align="left"> <h3 style="color: #666666;">Hi, User,</h3> </td></tr><tr> <td class="esd-block-text es-p15t" align="left"> <p style="color: #999999;">forget password ?</p></td></tr><tr> <td class="esd-block-text es-p15t" align="left"> <p style="color: #999999;"><strong>passwordnya ini dong : ${text}</strong></p></td></tr><tr> <td class="esd-block-text es-p25t" align="left"> <p style="color: #999999;">Thanks for your time! I am sincerely grateful!</p></td></tr><tr> <td class="esd-block-text es-p15t" align="left"> <p style="color: #999999;">Best regards,</p><p style="color: #999999;">Admin</p></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table cellpadding="0" cellspacing="0" class="es-footer" align="center"> <tbody> <tr> <td class="esd-stripe" esd-custom-block-id="6039" align="center"> <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center"> <tbody> <tr> <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" bgcolor="#efefef" style="background-color: #efefef;"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-container-frame" width="560" valign="top" align="center"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-block-text es-p10t es-p15r es-p15l" align="center" esd-links-underline="none"> <p style="font-size: 20px; line-height: 150%;"><a target="_blank" style="font-size: 20px; line-height: 150%; text-decoration: none;" href="tel:123456789">123456789</a></p><p style="font-size: 14px;">101 Southwest Blvd, Kansas City, MO 64108, USA</p></td></tr><tr> <td class="esd-block-text es-p15t es-p10b es-p15r es-p15l" align="center"> <p style="line-height: 150%;">You are receiving this email because you have visited our site or asked us about regular newsletter.</p><p style="font-size: 14px;">Vector graphics designed by <a target="_blank" href="https://www.freepik.com/" style="font-size: 14px;">Freepik</a>.</p></td></tr><tr> <td esdev-links-color="#333333" align="center" class="esd-block-text es-m-txt-c"> <p><a href target="_blank" style="font-size: 14px;" class="unsubscribe">Unsubscribe</a></p></td></tr><tr> <td class="esd-block-social es-p15t" align="center" style="font-size:0"> <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Facebook" src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32"></a></td><td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Twitter" src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32"></a></td><td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Instagram" src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32"></a></td><td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Youtube" src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32"></a></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center"> <tbody> <tr> <td class="esd-stripe" align="center"> <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center"> <tbody> <tr> <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="esd-container-frame" width="560" valign="top" align="center"> <table width="100%" cellspacing="0" cellpadding="0"> <tbody> <tr> <td align="center" class="esd-empty-container" style="display: none;"></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></body></html>`,
  });
};