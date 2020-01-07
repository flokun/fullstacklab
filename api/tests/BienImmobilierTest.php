<?php


namespace App\Tests;


use App\Entity\BienImmobilier;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class BienImmobilierTest extends KernelTestCase
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * {@inheritDoc}
     */
    protected function setUp(): void
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    /** @test */
    public function getAllBienImmobilier()
    {
        $biensImmobilier = $this->entityManager->getRepository(BienImmobilier::class)->findAll();
        $this->assertGreaterThan(1, $biensImmobilier);
    }

    /** @test */
    public function getBienImmobilier()
    {
        /** @var BienImmobilier $biensImmobilier */
        $biensImmobilier = $this->entityManager->getRepository(BienImmobilier::class)->find(1);

        $this->assertEquals(5, $biensImmobilier->getNumDispo());
        $this->assertEquals("2015-01-05", $biensImmobilier->getDateMutation()->format("Y-m-d"));
        $this->assertEquals("Vente", $biensImmobilier->getNatureMutation());
        $this->assertEquals(120, $biensImmobilier->getValeurFonciere());
        $this->assertEquals(1250, $biensImmobilier->getCodePostal());
        $this->assertEquals(1, $biensImmobilier->getCodeDepartement());
        $this->assertEquals(245, $biensImmobilier->getCodeCommune());
        $this->assertEquals(0, $biensImmobilier->getSurfaceReelleBati());
        $this->assertEquals(82, $biensImmobilier->getSurfaceTerrain());
    }
}
