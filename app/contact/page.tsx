"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FadeIn } from "@/components/fade-in";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log(formData);
    setFormSubmitted(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-teal-500 to-cyan-600 text-white py-20 md:py-28">
        <div className="container px-4 mx-auto relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Hubungi Kami
              </h1>
              <p className="text-lg md:text-xl mb-8 text-green-100">
                Kami siap membantu Anda dengan pertanyaan, saran, atau kebutuhan
                apa pun
              </p>
            </div>
          </FadeIn>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-20 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}
        ></div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn>
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium mb-4">
                  Informasi Kontak
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Hubungi Kami Kapan Saja
                </h2>
                <p className="text-gray-600 mb-8">
                  Tim layanan pelanggan kami siap membantu Anda dengan
                  pertanyaan, saran, atau kebutuhan apa pun. Jangan ragu untuk
                  menghubungi kami melalui salah satu saluran di bawah ini.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mr-4">
                      <MapPin className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">
                        Alamat
                      </h3>
                      <p className="text-gray-600">
                        Jl. Laut Biru No. 123, Kota Jakarta Utara, DKI Jakarta,
                        14250
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mr-4">
                      <Phone className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">
                        Telepon
                      </h3>
                      <p className="text-gray-600">+62 812-3456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mr-4">
                      <Mail className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">
                        Email
                      </h3>
                      <p className="text-gray-600">info@lautanfrozen.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mr-4">
                      <Clock className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">
                        Jam Operasional
                      </h3>
                      <p className="text-gray-600">
                        Senin - Jumat: 08.00 - 17.00 WIB
                        <br />
                        Sabtu: 09.00 - 15.00 WIB
                        <br />
                        Minggu & Hari Libur: Tutup
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-semibold mb-4">
                    Layanan Pelanggan
                  </h3>
                  <p className="mb-4">
                    Butuh bantuan segera? Hubungi tim layanan pelanggan kami
                    melalui WhatsApp untuk respons cepat.
                  </p>
                  <Button
                    asChild
                    className="bg-white text-teal-600 hover:bg-teal-50"
                  >
                    <Link href="https://wa.me/6281234567890">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat via WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      Pesan Terkirim!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Terima kasih telah menghubungi kami. Tim kami akan segera
                      merespons pesan Anda dalam 1x24 jam.
                    </p>
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                    >
                      Kirim Pesan Lain
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">
                        Kirim Pesan
                      </h3>
                      <p className="text-gray-600">
                        Isi formulir di bawah ini dan kami akan segera
                        menghubungi Anda
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Nomor Telepon</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Subjek</Label>
                          <RadioGroup
                            value={formData.subject}
                            onValueChange={(value) =>
                              setFormData({ ...formData, subject: value })
                            }
                            className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="general" id="general" />
                              <Label
                                htmlFor="general"
                                className="cursor-pointer"
                              >
                                Pertanyaan Umum
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="order" id="order" />
                              <Label htmlFor="order" className="cursor-pointer">
                                Pesanan
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="product" id="product" />
                              <Label
                                htmlFor="product"
                                className="cursor-pointer"
                              >
                                Produk
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other" className="cursor-pointer">
                                Lainnya
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label htmlFor="message">Pesan</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="mt-1"
                            rows={5}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Kirim Pesan
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-teal-50">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium mb-4">
                Lokasi Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Kunjungi Kantor Kami
              </h2>
              <p className="text-gray-600">
                Kami berlokasi di Jakarta Utara, dekat dengan pelabuhan untuk
                memastikan kesegaran produk laut kami
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.9998023463185!2d106.8515425!3d-6.1214351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d4160e8a9d7%3A0x3e6c3fd63a9c9a88!2sLautanFrozen%20Outlet%20Jakarta%20Utara!5e0!3m2!1sen!2sid!4v1716270354561!5m2!1sen!2sid"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    LautanFrozen
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Beberapa lokasi kami di Jakarta Utara tersedia untuk Anda
                    kunjungi langsung.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                  >
                    <Link
                      href="https://www.google.com/maps/d/u/0/viewer?mid=1cZGKhKxUZz_k1VzMUIlkU29O9fY&hl=id" // Ganti jika punya peta sendiri
                      target="_blank"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Lihat Semua Lokasi
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 md:py-24 bg-teal-50">
        <div className="container px-4 mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium mb-4">
                Media Sosial
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Ikuti Kami
              </h2>
              <p className="text-gray-600">
                Dapatkan update terbaru, tips memasak, dan promo eksklusif
                dengan mengikuti kami di media sosial
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <FadeIn delay={0.1}>
              <Link href="https://facebook.com" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-1 rounded-2xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                  <div className="bg-white p-6 rounded-xl h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">
                      Facebook
                    </h3>
                    <p className="text-gray-600 text-sm">@LautanFrozen</p>
                  </div>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link href="https://instagram.com" className="group">
                <div className="bg-gradient-to-br from-pink-50 to-purple-100 p-1 rounded-2xl group-hover:from-pink-100 group-hover:to-purple-200 transition-all">
                  <div className="bg-white p-6 rounded-xl h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-600"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">
                      Instagram
                    </h3>
                    <p className="text-gray-600 text-sm">@LautanFrozen</p>
                  </div>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link href="https://twitter.com" className="group">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-1 rounded-2xl group-hover:from-cyan-100 group-hover:to-blue-200 transition-all">
                  <div className="bg-white p-6 rounded-xl h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mb-4 group-hover:bg-cyan-200 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-600"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">
                      Twitter
                    </h3>
                    <p className="text-gray-600 text-sm">@LautanFrozen</p>
                  </div>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link href="https://youtube.com" className="group">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-1 rounded-2xl group-hover:from-red-100 group-hover:to-red-200 transition-all">
                  <div className="bg-white p-6 rounded-xl h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-600"
                      >
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">
                      YouTube
                    </h3>
                    <p className="text-gray-600 text-sm">
                      LautanFrozen Channel
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
