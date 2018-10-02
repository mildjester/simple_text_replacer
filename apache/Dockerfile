FROM amazonlinux:2017.03-with-sources

RUN yum update -y \
 && yum install -y vim httpd hp php-devel php-mysql php-pdo php-xml php-mbstring \
 && cp -p /usr/share/zoneinfo/Japan /etc/localtime

ADD php.ini /etc/php.ini
ADD bashrc /root/.bashrc

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
