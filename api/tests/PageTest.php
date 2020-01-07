<?php


namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PageTest extends WebTestCase
{
    /** @test */
    public function checkSucessBienImmos(){
        $client = static::createClient();
        $client->request('GET', '/bien_immobiliers/ventes_regions/2015');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /** @test */
    public function checkSucessPriceByMonthYear(){
        $client = static::createClient();
        $client->request('GET', '/bien_immobiliers/priceByMonthYear');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /** @test */
    public function checkSucessVentesPeriod(){
        $client = static::createClient();
        $client->request('GET', '/bien_immobiliers/ventes_period/month/2015-01-01/2015-12-31');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
