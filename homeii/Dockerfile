ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN pip3 install --no-cache-dir aiohttp==3.12.15 PyYAML==6.0.2
COPY rootfs /
RUN chmod a+x /etc/services.d/homeii/run

EXPOSE 8099
