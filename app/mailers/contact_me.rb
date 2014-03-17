class ContactMe < ActionMailer::Base
  default to: "beckman.ryan@gmail.com"

  def contact_mail(name, email, message)
    @name, @email, @message = name, email, message
    mail(from: email, subject: "Message from Personal Website")
  end
end
