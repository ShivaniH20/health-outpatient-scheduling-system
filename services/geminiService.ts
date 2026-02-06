
import { GoogleGenAI } from "@google/genai";
import { Appointment } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTriageAdvice = async (symptoms: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a medical triage assistant for an Indian hospital scheduling system. 
      The patient says: "${symptoms}". 
      Briefly suggest:
      1. Potential medical specialty needed.
      2. Urgency level (Routine, Urgent, Emergency).
      3. One key question they should prepare for the doctor.
      Keep it professional and concise. Add a disclaimer that you are an AI.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error getting AI advice. Please consult a doctor directly.";
  }
};

export const generateReminderText = async (appointment: Appointment, medium: 'SMS' | 'Email') => {
  try {
    const prompt = `Write a polite and professional ${medium} appointment reminder for an Indian patient named ${appointment.patientName}. 
    Details: Doctor ${appointment.doctorName}, Specialty ${appointment.specialty}, Time ${appointment.time}, Date ${appointment.date}.
    The hospital is "SevaHealth Gurugram".
    Keep the SMS under 160 characters. 
    Make the Email slightly more detailed (include a "Prepare for your visit" tip).
    Return ONLY the text content.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return `Reminder: You have an appointment with ${appointment.doctorName} at SevaHealth on ${appointment.date} at ${appointment.time}.`;
  }
};

export const getProjectArchitectureSummary = async () => {
    const prompt = "Explain the benefits of choosing EffectTS with Bun vs. Kotlin with Spring Boot for a high-concurrency hospital appointment system in India. Mention Nx monorepo benefits.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        return "Architecture analysis unavailable.";
    }
}
