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
}
