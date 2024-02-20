const { LogLevel } = require("@opentelemetry/core");
const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor } = require("@opentelemetry/tracing");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");

const provider = new NodeTracerProvider({
  logLevel: LogLevel.ERROR
});

const startMonitoring = (serviceName, zipkinUrl) => {
  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      new ZipkinExporter({
        serviceName,
        url: zipkinUrl   
      })
    )
  );
}

module.exports = startMonitoring;
