package com.store.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String receiverName, String receiverMail, String receiverPassword){
        SimpleMailMessage message=new SimpleMailMessage();
        String mailSubject="Invitation to Join the CosaStore Delivery Team";
        String mailBody=
                "Dear "+receiverName+",\n" +
                "\n" +
                "We hope this email finds you in good spirits. We are thrilled to extend to you an invitation to join our dynamic community of delivery personnel at CosaStore.\n" +
                "\n" +
                "Your exceptional communication skills have caught our attention, and we believe that your unique insights can greatly contribute to our community's success.\n" +
                "\n" +
                "As a delivery person, you will have the opportunity to:\n" +
                "\n" +
                "- Access your interface to view assigned commands, each accompanied by pertinent information.\n" +
                "- Upon completing deliveries, you are required to validate them on our website to ensure transparency and accountability in every stage of the delivery process.\n" +
                "\n" +
                "To become a part of our delivery team, simply follow these steps:\n" +
                "\n" +
                "1. Sign in to our web application using the credentials provided below.\n" +
                "2. Utilize the same credentials to log in to the application.\n" +
                "\n" +
                "Email: "+receiverMail+"\n" +
                "Password: "+receiverPassword+"\n" +
                "\n" +
                "We eagerly anticipate your participation and the positive impact you will bring to the experiences of our community members.\n" +
                "\n" +
                "Should you have any inquiries or require assistance throughout the process, please do not hesitate to contact our support team at [cozaa.storee@gmail.com].\n" +
                "\n" +
                "Thank you for considering this invitation. Your expertise is highly valued, and we are enthusiastic about the prospect of having you as an integral part of our team.\n" +
                "\n" +
                "Best regards,\n" +
                "\n" +
                "The CosaStore Team";
        message.setFrom("cozaa.storee@gmail.com");
        message.setTo(receiverMail);
        message.setText(mailBody);
        message.setSubject(mailSubject);

        mailSender.send(message);
    }
    public void sendCommandEmail(String receiverName, String receiverMail){
        SimpleMailMessage message=new SimpleMailMessage();
        String mailSubject="Command validated successfully";
        String mailBody=
                "Dear "+receiverName+",\n" +
                        "\n" +
                        "We hope this email finds you in good spirits.\n" +
                        "\n" +
                        "We are thrilled to inform you that your order has been successfully received and accepted! Thank you for choosing COZASTORE for your purchase.\n" +
                        "\n" +
                        "We are committed to providing you with top-notch service, and we're excited to let you know that your package will be on its way to you shortly. You can expect to receive it within the next 2 days, with a maximum delivery time of 48 hours.\n" +
                        "\n" +
                        "Should you have any questions or concerns regarding your order, please feel free to contact us by email or phone. You can find our contact information on our website. We're here to assist you every step of the way.\n" +
                        "\n" +
                        "Thank you once again for choosing COZASTORE. We greatly appreciate your business and look forward to serving you again in the future."+
                        "Should you have any inquiries or require assistance throughout the process, please do not hesitate to contact our support team at [cozaa.storee@gmail.com].\n" +
                        "\n" +
                        "Best regards,\n" +
                        "\n" +
                        "The CosaStore Team";
        message.setFrom("cozaa.storee@gmail.com");
        message.setTo(receiverMail);
        message.setText(mailBody);
        message.setSubject(mailSubject);

        mailSender.send(message);
    }
}
