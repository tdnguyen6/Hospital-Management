<?php
declare(strict_types=1);
require_once __DIR__ . "/Room.php";
require_once __DIR__ . "/Prescription.php";
require_once __DIR__ . "/MedicalService.php";

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\TransactionRequiredException;

/**
 * @ORM\Entity
 */
class MedicalService
{
    protected EntityManager $entityManager;

    /**
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @var int
     */
    protected int $id;
    /**
     * @ORM\Column(length=50)
     * @var string
     */
    protected string $name;
    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected int $price;
    /**
     * @ORM\OneToMany(targetEntity="Visit", mappedBy="requestedService")
     */
    protected $visits;
    /**
     * @ORM\OneToMany(targetEntity="Room", mappedBy="medicalService")
     */
    protected $locations;
    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected int $noOfPatients;
    /**
     * @ORM\Column(type="integer")
     * @var int
     */
    protected int $noOfRooms;

    public function __construct()
    {
        $this->locations = new ArrayCollection();
        $this->visits = new ArrayCollection();
    }


    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @param $name
     * @return  self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of price
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @param $price
     * @return  self
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get the value of visits
     */
    public function getVisits()
    {
        return $this->visits;
    }

    /**
     * Set the value of visits
     *
     * @param array $visitIDs
     * @return  self
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function setVisits(array $visitIDs)
    {
        foreach ($visitIDs as $visitID) {
            $visitObj = $this->entityManager->find('Visit', $visitID);
            $this->visits[] = $visitObj;
        }
        $this->noOfPatients = count($this->visits);

        return $this;
    }

    /**
     * Get the value of locations
     */
    public function getLocations()
    {
        return $this->locations;
    }

    /**
     * Set the value of locations
     *
     * @param array $locationIDs
     * @return  self
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function setLocations(array $locationIDs)
    {
        foreach ($locationIDs as $locationID) {
            $roomObj = $this->entityManager->find('Room', $locationID);
            $this->locations[] = $roomObj;
        }
        $this->noOfRooms = count($this->locations);

        return $this;
    }

    /**
     * Get the value of noOfPatients
     */
    public function getNoOfPatients()
    {
        return $this->noOfPatients;
    }

    /**
     * Set the value of noOfPatients
     *
     * @param $noOfPatients
     * @return  self
     */
    public function setNoOfPatients($noOfPatients)
    {
        $this->noOfPatients = $noOfPatients;

        return $this;
    }

    /**
     * Get the value of noOfRooms
     */
    public function getNoOfRooms()
    {
        return $this->noOfRooms;
    }

    /**
     * Set the value of noOfRooms
     *
     * @param $noOfRooms
     * @return  self
     */
    public function setNoOfRooms($noOfRooms)
    {
        $this->noOfRooms = $noOfRooms;

        return $this;
    }

    public function get()
    {
        return [
            "id" => $this->getId(),
            "name" => $this->getName(),
            "price" => $this->getPrice(),
            "noOfPatients" => $this->getNoOfPatients(),
            "noOfRooms" => $this->getNoOfRooms()
        ];
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) == 4
            && array_key_exists("name", $fields)
            && array_key_exists("price", $fields)
            && array_key_exists("visits", $fields)
            && array_key_exists("locations", $fields)
            && $fields["name"] !== ""
            && $fields["price"] !== ""
        ) {
            return true;
        }
        return false;
    }

    public static function getKeys() {
        return ["id"];
    }
}
