Author:- Anuj Verma

# Integrating Jaeger Tracing with Express Node.js Application

This guide demonstrates how to integrate Jaeger distributed tracing with an Express Node.js application using OpenTelemetry.

## Prerequisites

- Node.js installed on your system
- Jaeger instance running or accessible (you can use Docker to set up a local instance)
- Basic understanding of Express.js and distributed tracing concepts

## Installation

1. Clone the repository or initialize a new Node.js project.

2. Install required dependencies:

    ```bash
    npm install @opentelemetry/api @opentelemetry/instrumentation @opentelemetry/sdk-trace-node @opentelemetry/sdk-trace-base @opentelemetry/exporter-jaeger @opentelemetry/resources @opentelemetry/instrumentation-express @opentelemetry/instrumentation-http
    ```

3. Create a `tracer.js` file and add the following code:

    ```javascript
    const opentelemetry = require('@opentelemetry/api');
    const { registerInstrumentations } = require('@opentelemetry/instrumentation');
    const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
    const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
    const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
    const { Resource } = require('@opentelemetry/resources');
    const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
    const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
    const { SemanticResourceAttributes: ResourceAttributesSC } = require('@opentelemetry/semantic-conventions');
    const { serviceName, serviceInstanceId } = require('./tracer.config');

    module.exports = () => {
      const provider = new NodeTracerProvider({
        resource: new Resource({
          [ResourceAttributesSC.SERVICE_NAME]: serviceName,
          [ResourceAttributesSC.SERVICE_INSTANCE_ID]: serviceInstanceId,
        }),
      });
      registerInstrumentations({
        tracerProvider: provider,
        instrumentations: [
          HttpInstrumentation,
          ExpressInstrumentation,
        ],
      });

      const exporter = new JaegerExporter({
        // Provide Jaeger exporter options here if needed
      });

      provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

      provider.register();

      return opentelemetry.trace.getTracer(serviceName);
    };
    ```

    Make sure to replace `tracer.config` with the appropriate path where your service name and instance ID are defined.

4. Create a `tracer.config.js` file:

    ```javascript
    module.exports = {
      serviceName: 'your-service-name', // Replace with your service name
      serviceInstanceId: 'your-service-instance-id', // Optional
    };
    ```

5. Create an Express application and import the `tracer.js` file to instrument it with Jaeger tracing.
    ```javascript
    require('tracer file path')();
    const express = require('express');
    const app = express();
    ```



6. Start your Express application and verify that it's sending traces to Jaeger.

## Configuration

- Update the Jaeger exporter options in the `tracer.js` file if you need to specify a custom Jaeger endpoint or any other exporter options.

## Usage

- Once integrated, your Express application will automatically start sending traces to Jaeger. You can then use the Jaeger UI to visualize and analyze the traces.
