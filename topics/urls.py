"""Tome URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from topics import views

app_name = 'topics'
urlpatterns = [
    url(r'^$',
        views.index,
        name='index'),
    url(r'^topics_as_json/',
        views.topicsAsJSON,
        name='topics_as_json'),
    url(r'^all_topics_as_json/',
        views.allTopicsAsJSON,
        name='all_topics_as_json'),
    url(r'^location_mapper/',
        views.locationMap,
        name='location_mapper'),
    url(r'^articles_by_topics/',
        views.getArticleTableData,
        name='articles_by_topics'),
    url(r'^topics_by_paper/',
        views.topicsByPaper,
        name='topics_by_paper'),
    url(r'^(?P<key>[0-9]+)/words$',
        views.getTopicWords,
        name='topic_words'),

]
