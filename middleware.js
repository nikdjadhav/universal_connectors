import React from "react";
import { NextResponse } from "next/server";
// import { NextResponse } from 'next/dist/server/web/spec-extension/response'

export default async function middleware(req) {
  const verify = req.session.get("loginCredentials");
  const url = req.url;

  if(!verify && url.includes("/integrations")) {
    return NextResponse.redirect("/login");
  }
}
