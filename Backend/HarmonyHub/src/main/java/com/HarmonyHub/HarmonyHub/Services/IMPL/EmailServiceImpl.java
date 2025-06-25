package com.HarmonyHub.HarmonyHub.Services.IMPL;

import com.HarmonyHub.HarmonyHub.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    @Async
    public void sendEmail(String to, String subject, String messageText) {
        System.out.println(">>> Wysyłanie e-maila do: " + to);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("harmonyhubtest@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(messageText);

            mailSender.send(message);

            System.out.println(">>> E-mail wysłany pomyślnie do: " + to);
        } catch (Exception e) {
            System.err.println(">>> Błąd przy wysyłaniu e-maila do " + to + ": " + e.getMessage());
        }
    }
}
