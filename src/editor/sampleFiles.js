/**
 * Spectrum Editor - Complete Sample Files Suite
 * Demonstrates SVG icons and syntax color styling across ALL supported languages.
 */

export const SAMPLE_FILES = [
  {
    id: 'dart-main',
    name: 'main.dart',
    language: 'dart',
    content: `// Flutter State Management & Theme Controller
import 'package:flutter/material.dart';

void main() {
  runApp(const SpectrumApp());
}

class SpectrumApp extends StatefulWidget {
  const SpectrumApp({super.key});

  @override
  State<SpectrumApp> createState() => _SpectrumAppState();
}

class _SpectrumAppState extends State<SpectrumApp> {
  int _counter = 42;

  void _incrementCounter() {
    setState(() {
      _counter += 1;
      debugPrint('Counter updated: \$_counter');
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('Helix Editor Engine')),
        body: Center(child: Text('Count: \$_counter')),
        floatingActionButton: FloatingActionButton(
          onPressed: _incrementCounter,
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}`
  },

  {
    id: 'js-app',
    name: 'app.js',
    language: 'javascript',
    content: `/**
 * JavaScript ES2024 Engine Controller
 */
import { Tokenizer } from './tokenizer.js';

class EditorEngine {
  constructor(options = {}) {
    this.name = "Spectrum Engine";
    this.version = "1.0.0";
  }

  async parseSource(code) {
    console.log("Analyzing tokens...");
    return Tokenizer.tokenize(code, 'javascript');
  }
}

export default new EditorEngine();`
  },

  {
    id: 'ts-types',
    name: 'types.ts',
    language: 'typescript',
    content: `/**
 * TypeScript Type Definitions
 */
export interface EditorToken {
  type: string;
  value: string;
  index: number;
}

export type ThemeMode = 'dark' | 'light' | 'cyberpunk';

export class TokenStream<T extends EditorToken> {
  private tokens: T[] = [];

  public addToken(token: T): void {
    this.tokens.push(token);
  }

  public get count(): number {
    return this.tokens.length;
  }
}`
  },

  {
    id: 'html-index',
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Spectrum Editor Suite</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="dark-theme">
    <div id="root" class="editor-container">
      <header class="app-header">
        <h1>Spectrum Vector & Syntax Engine</h1>
      </header>
    </div>
  </body>
</html>`
  },

  {
    id: 'py-pipeline',
    name: 'pipeline.py',
    language: 'python',
    content: `#!/usr/bin/env python3
"""
Python Data Processing Pipeline
"""
import sys
import time
from typing import List, Dict

class DataProcessor:
    def __init__(self, batch_size: int = 64) -> None:
        self.batch_size = batch_size
        print(f"[Pipeline] Initialized batch size: {self.batch_size}")

    def execute(self, items: List[str]) -> Dict[str, int]:
        # Process batch items
        results = {item: len(item) for item in items}
        return results

if __name__ == "__main__":
    proc = DataProcessor()
    print(proc.execute(["dart", "python", "rust"]))`
  },

  {
    id: 'rs-kernel',
    name: 'kernel.rs',
    language: 'rust',
    content: `// Rust Microkernel Memory Manager
pub struct MemoryArena {
    capacity: usize,
    used: usize,
}

impl MemoryArena {
    pub const fn new(cap: usize) -> Self {
        Self { capacity: cap, used: 0 }
    }

    pub fn allocate(&mut self, bytes: usize) -> Result<usize, &'static str> {
        if self.used + bytes > self.capacity {
            return Err("Out of memory");
        }
        self.used += bytes;
        Ok(self.used)
    }
}`
  },

  {
    id: 'go-server',
    name: 'server.go',
    language: 'golang',
    content: `package main

import (
	"fmt"
	"net/http"
)

func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Spectrum HTTP Engine v1.0")
}

func main() {
	http.HandleFunc("/", handleRoot)
	fmt.Println("Listening on :8080...")
	http.ListenAndServe(":8080", nil)
}`
  },

  {
    id: 'c-system',
    name: 'system.c',
    language: 'c',
    content: `#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    printf("Spectrum C Low-level Core Initialized\\n");
    for (int i = 0; i < argc; i++) {
        printf("Arg [%d]: %s\\n", i, argv[i]);
    }
    return 0;
}`
  },

  {
    id: 'cpp-engine',
    name: 'engine.cpp',
    language: 'cpp',
    content: `#include <iostream>
#include <vector>
#include <string>

class GraphicRenderer {
private:
    std::string name;
    int frameCount;

public:
    GraphicRenderer(std::string n) : name(n), frameCount(0) {}

    void render() {
        frameCount++;
        std::cout << "Rendering frame " << frameCount << std::endl;
    }
};`
  },

  {
    id: 'cs-program',
    name: 'Program.cs',
    language: 'csharp',
    content: `using System;
using System.Threading.Tasks;

namespace Spectrum.Core
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("C# Runtime Started");
            await Task.Delay(100);
        }
    }
}`
  },

  {
    id: 'java-app',
    name: 'Application.java',
    language: 'java',
    content: `package com.spectrum.editor;

import java.util.ArrayList;
import java.util.List;

public class Application {
    private final String appName;

    public Application(String appName) {
        this.appName = appName;
    }

    public void start() {
        System.out.println("Starting Java Enterprise Node: " + appName);
    }

    public static void main(String[] args) {
        Application app = new Application("Helix-Java-Core");
        app.start();
    }
}`
  },

  {
    id: 'kt-activity',
    name: 'Activity.kt',
    language: 'kotlin',
    content: `package com.spectrum.mobile

class MainActivity : AppActivity() {
    private val version: String = "2.0.0"

    override fun onCreate() {
        super.onCreate()
        println("Kotlin Activity Initialized: $version")
    }
}`
  },

  {
    id: 'swift-view',
    name: 'ContentView.swift',
    language: 'swift',
    content: `import SwiftUI

struct ContentView: View {
    @State private var counter = 0

    var body: some View {
        VStack {
            Text("Spectrum Swift UI")
                .font(.headline)
            Button("Increment") {
                counter += 1
            }
        }
        .padding()
    }
}`
  },

  {
    id: 'php-api',
    name: 'api.php',
    language: 'php',
    content: `<?php
header('Content-Type: application/json');

$response = [
    'status' => 'success',
    'engine' => 'Spectrum PHP Engine',
    'timestamp' => time()
];

echo json_encode($response);
?>`
  },

  {
    id: 'rb-service',
    name: 'service.rb',
    language: 'ruby',
    content: `class SpectrumService
  attr_accessor :name, :status

  def initialize(name)
    @name = name
    @status = :active
  end

  def perform_task
    puts "Executing Ruby task for #{@name}"
  end
end`
  },

  {
    id: 'sh-deploy',
    name: 'deploy.sh',
    language: 'bash',
    content: `#!/usr/bin/env bash
set -e

echo "Deploying Spectrum Editor artifacts..."
npm test
echo "Deployment completed successfully."`
  },

  {
    id: 'sql-schema',
    name: 'schema.sql',
    language: 'sql',
    content: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users WHERE username = 'helix';`
  },

  {
    id: 'css-styles',
    name: 'styles.css',
    language: 'css',
    content: `:root {
  --primary-color: #00F0FF;
  --bg-color: #0D1117;
}

.editor-window {
  display: flex;
  background: var(--bg-color);
  border-radius: 8px;
}`
  },

  {
    id: 'scss-theme',
    name: 'theme.scss',
    language: 'sass',
    content: `$accent: #CC6699;
$dark-bg: #1A1B26;

.helix-theme {
  background-color: $dark-bg;
  
  .badge {
    color: $accent;
    border: 1px solid rgba($accent, 0.4);
  }
}`
  },

  {
    id: 'json-config',
    name: 'config.json',
    language: 'json',
    content: `{
  "name": "spectrum-editor",
  "version": "1.0.0",
  "theme": "spectrum-dark",
  "features": {
    "svgIcons": true,
    "syntaxHighlighting": true,
    "liveTokenInspector": true
  }
}`
  },

  {
    id: 'yaml-deploy',
    name: 'deploy.yaml',
    language: 'yaml',
    content: `version: '3.8'
services:
  editor:
    image: spectrum-editor:latest
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production`
  },

  {
    id: 'xml-manifest',
    name: 'manifest.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<application name="Spectrum">
  <version>1.0.0</version>
  <features>
    <feature id="svg-icons" enabled="true" />
  </features>
</application>`
  },

  {
    id: 'md-readme',
    name: 'README.md',
    language: 'markdown',
    content: `# Spectrum Editor
A reusable toolkit for SVG file icons and syntax color themes.`
  },

  {
    id: 'txt-notes',
    name: 'notes.txt',
    language: 'text',
    content: `Spectrum Editor Customization Suite
- 25+ Programming Languages supported
- SVG Vector Icons with custom accents
- Multi-theme syntax color token engine`
  },

  {
    id: 'docker-file',
    name: 'Dockerfile',
    language: 'docker',
    content: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`
  },

  {
    id: 'pkg-json',
    name: 'package.json',
    language: 'json',
    content: `{
  "name": "spectrum-editor",
  "version": "1.0.0",
  "type": "module"
}`
  },

  {
    id: 'git-ignore',
    name: '.gitignore',
    language: 'bash',
    content: `node_modules/
dist/
.DS_Store
*.log`
  }
];
